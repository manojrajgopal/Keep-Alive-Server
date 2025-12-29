from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.scheduler import stop_project
from app.database import SessionLocal, engine
from app.models import Base, Project
from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse
from app import crud
from app.scheduler import start_project, stop_project


# ✅ CREATE FASTAPI APP
app = FastAPI(title="KeepAlive Server")


# ✅ ADD CORS (Frontend Access)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ CREATE TABLES
Base.metadata.create_all(bind=engine)


# ✅ START SCHEDULER ON SERVER START
@app.on_event("startup")
async def startup_event():
    db = SessionLocal()
    projects = db.query(Project).filter(Project.enabled == True).all()

    for project in projects:
        start_project(
            project.id,
            project.url,
            project.interval_seconds
        )

    db.close()



    for project in projects:
        print(f"▶️ Starting scheduler for: {project.name}")
        start_project(
            project.id,
            project.url,
            project.interval_seconds
        )

    db.close()


# ✅ DATABASE DEPENDENCY
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ ADD PROJECT (Frontend POST)
@app.post("/projects")
async def add_project(
    data: ProjectCreate,
    db: Session = Depends(get_db)
):
    project = crud.create_project(
        db,
        data.name,
        data.url,
        data.interval_seconds
    )

    # ✅ SAFE: we are inside the event loop now
    start_project(
        project.id,
        project.url,
        project.interval_seconds
    )

    return project




# ✅ LIST PROJECTS (Frontend GET)
@app.get("/projects", response_model=list[ProjectResponse])
def list_projects(db: Session = Depends(get_db)):
    return crud.get_all_projects(db)


# ✅ EDIT PROJECT
@app.put("/projects/{project_id}")
async def edit_project(
    project_id: int,
    data: ProjectUpdate,
    db: Session = Depends(get_db)
):
    project = crud.update_project(db, project_id, data)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if project.enabled:
        start_project(project.id, project.url, project.interval_seconds)
    else:
        stop_project(project.id)

    return project


@app.delete("/projects/{project_id}")
async def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = crud.delete_project(db, project_id)

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Stop scheduler task if running
    stop_project(project_id)

    return {"message": "Project deleted successfully"}



# ✅ HEALTH CHECK
@app.get("/")
def health_check():
    return {"status": "KeepAlive server is running"}
