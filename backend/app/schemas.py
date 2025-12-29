from pydantic import BaseModel, HttpUrl
from datetime import datetime


class ProjectCreate(BaseModel):
    name: str
    url: HttpUrl
    interval_seconds: int

class ProjectUpdate(BaseModel):
    name: str
    url: str
    interval_seconds: int
    enabled: bool

class ProjectResponse(BaseModel):
    id: int
    name: str
    url: str
    interval_seconds: int
    enabled: bool
    last_ping_time: datetime | None
    last_status_code: int | None

    class Config:
        from_attributes = True

