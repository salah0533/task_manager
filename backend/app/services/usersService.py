from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models.users import Users


def add_user(db:Session,name:str,email:str,hashedpass:str,level:int=0):
    try:
        new_user = Users(name=name,email=email,hashedpass=hashedpass,level=level)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except SQLAlchemyError as e:
        db.rollback()
        raise e
    
def get_user_by_email(db:Session,email:str):
    try:
        return db.query(Users).filter(Users.email==email).first()
    except SQLAlchemyError as e:
        raise e
    
def check_password(db:Session,id:int,hashedpass:str):
    try:
        res = db.query(Users.hashedpass).filter(Users.id==id).first()
        if res[0]==hashedpass:
            return True
        else :
            return False
    except SQLAlchemyError as e:
        raise e
    
def user_exist(db:Session,email:str):
    res = db.query(Users).filter(Users.email == email).first()
    if res:
        return True
    else :
        return False
    
def get_hashedpass_user(db:Session,email:str):
    return db.query(Users.hashedpass).filter(Users.email==email).first()
