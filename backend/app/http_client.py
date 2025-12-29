import httpx
from datetime import datetime
from app.database import SessionLocal
from app.models import Project

async def send_request(project_id: int, url: str):
    db = SessionLocal()
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url)

            project = db.query(Project).filter(Project.id == project_id).first()
            if project:
                project.last_ping_time = datetime.utcnow()
                project.last_status_code = response.status_code
                db.commit()

            print(f"[PING] {url} -> {response.status_code}")

    except Exception as e:
        project = db.query(Project).filter(Project.id == project_id).first()
        if project:
            project.last_ping_time = datetime.utcnow()
            project.last_status_code = 0  # 0 = failed
            db.commit()

        print(f"[ERROR] {url} -> {str(e)}")

    finally:
        db.close()
