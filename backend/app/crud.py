from sqlalchemy.orm import Session
from app.models import Project

def create_project(db: Session, name: str, url: str, interval_seconds: int):
    project = Project(
        name=name,
        url=url,
        interval_seconds=interval_seconds,
        enabled=True
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return project

def get_all_projects(db: Session):
    return db.query(Project).all()

def update_project(db: Session, project_id: int, data):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None

    project.name = data.name
    project.url = data.url
    project.interval_seconds = data.interval_seconds
    project.enabled = data.enabled

    db.commit()
    return project

def delete_project(db: Session, project_id: int):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        return None

    db.delete(project)
    db.commit()
    return project
