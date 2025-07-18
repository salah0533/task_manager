from sqlalchemy import String,Column,Integer
from db.base import Base


class TaskPriority(Base):
    __tablename__ = "task_priority"

    id = Column(Integer,primary_key=True,index=True)
    priority = Column(String(20))
