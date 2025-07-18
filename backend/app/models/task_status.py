from sqlalchemy import String,Integer,Column
from db.base import Base

class TaskStatus(Base):
    __tablename__ = "task_statuses"

    id = Column(Integer,primary_key=True,index=True)
    status = Column(String(50),unique=True)
