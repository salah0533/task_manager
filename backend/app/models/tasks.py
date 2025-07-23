from sqlalchemy import Column,Integer,String,DateTime,Text,ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db.base import Base

class Task(Base):
    __tablename__ = "task"

    id = Column(Integer,primary_key=True,index=True)
    title = Column(String(255),nullable=False)
    description = Column(Text)
    date = Column(DateTime,default=datetime.utcnow,nullable=False)
    completion_date = Column(DateTime)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    status_id = Column(Integer,ForeignKey("task_statuses.id"),nullable=False)
    priority_id = Column(Integer,ForeignKey("task_priority.id"),nullable=False)

    status = relationship("TaskStatus")
    priority = relationship("TaskPriority")
    user = relationship("Users")

