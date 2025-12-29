from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    url = Column(String(255))
    interval_seconds = Column(Integer)
    enabled = Column(Boolean, default=True)
    last_ping_time = Column(DateTime, nullable=True)
    last_status_code = Column(Integer, nullable=True)
