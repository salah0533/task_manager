from db.base import Base
from sqlalchemy import Column,Integer,String,Text

class Users(Base):
    __tablename__="users"
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String(50),nullable=False)
    email = Column(String(254),unique=True,nullable=False)
    hashedpass = Column(Text,nullable=False)
    level = Column(Integer,default=0)