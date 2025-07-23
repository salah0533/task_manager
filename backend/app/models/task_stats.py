from db.base import Base
from sqlalchemy import Column,Integer,ForeignKey
from sqlalchemy.orm import relationship



class TaskStats(Base):
    __tablename__ = "task_stats"

    id = Column(Integer,primary_key=True)
    del_counter   = Column(Integer,default=0)
    edit_counter  = Column(Integer,default=0)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    user = relationship("Users")

    def to_dict(self):
        return {
            "id": self.id,
            "edit_counter": self.edit_counter,
            "delete_counter": self.del_counter,
        }
