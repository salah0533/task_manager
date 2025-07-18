from db.base import Base
from sqlalchemy import Column,Integer


class TaskStats(Base):
    __tablename__ = "task_stats"

    id = Column(Integer,primary_key=True,default=1)
    add_counter = Column(Integer,default=0)
    del_counter   = Column(Integer,default=0)
    edit_counter  = Column(Integer,default=0)

    def to_dict(self):
        return {
            "id": self.id,
            "added_counter": self.add_counter,
            "edit_counter": self.edit_counter,
            "delete_counter": self.del_counter,
        }
