import asyncio
from app.http_client import send_request

active_tasks = {}

async def project_loop(project_id, url, interval_seconds):
    while True:
        await send_request(project_id, url)
        await asyncio.sleep(interval_seconds)

def start_project(project_id, url, interval_seconds):
    stop_project(project_id)

    task = asyncio.create_task(
        project_loop(project_id, url, interval_seconds)
    )

    active_tasks[project_id] = task

def stop_project(project_id):
    task = active_tasks.get(project_id)
    if task:
        task.cancel()
        active_tasks.pop(project_id)
