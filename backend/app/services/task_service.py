from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models.tasks import Task
from models.task_status import TaskStatus
from models.task_stats import TaskStats
from models.task_priority import TaskPriority
from datetime import datetime
from fastapi import HTTPException

def add_task(db:Session,title:str,description:str,status_id:int,priority_id:int,user_id:int):

    try:
        task_priority = [i.id for i in fetch_task_priority(db)]
        task_status = [i.id for i in fetch_task_statuses(db)]
        if priority_id not in task_priority or  status_id not in task_status :
            raise HTTPException(status_code=400, detail="Invalid status_id or priority_id")
        
        new_task = Task(title=title,description=description,status_id=status_id,priority_id=priority_id,user_id=user_id)
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def delete_tasks(db:Session,ids:list,user_id:int):
    try:
        result = db.query(Task).filter(
            Task.id.in_(ids) & (Task.user_id == user_id)
        ).delete(synchronize_session=False)

        db.commit()        
        increment_counter(db,"del_counter",user_id)
        return result
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def edit_task(db:Session,id:int,title:str,description:str,status_id:int,priority_id:int,user_id:int):
    try:
        current_date = datetime.utcnow()
        new_task = {"title":title,
                    "description":description,
                    "status_id":status_id,
                    "priority_id":priority_id,
                    "completion_date":current_date if status_id==3 else None}
        
        db.query(Task).filter(
            Task.id==id,
            Task.user_id==user_id
        ).update(new_task,synchronize_session=False)
        db.commit()        
        increment_counter(db,"edit_counter",user_id)
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def fetch_tasks(db:Session,user_id:int):
    try: 
        return db.query(Task).filter(Task.user_id==user_id).all()
    except SQLAlchemyError as e:
        db.rollback()
        raise e
    
def fetch_task_statuses(db:Session):
    try:
        return db.query(TaskStatus).all()
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def fetch_task_priority(db:Session):
    try:
        return db.query(TaskPriority).all()
    except SQLAlchemyError as e:
        db.rollback()
        raise e
    
def increment_counter(db:Session,field:str,user_id:int):
    try:
        stats = db.query(TaskStats).filter( TaskStats.user_id==user_id).first()
        if stats:
            setattr(stats,field,getattr(stats,field)+1)
            db.commit()
            db.refresh(stats)
        return stats
    
    except SQLAlchemyError as e:
        db.rollback()
        raise e

def decrement_counter(db:Session,field:str,user_id:int):
    try:
        stats = db.query(TaskStats).filter(TaskStats.user_id==user_id).first()
        if stats:
            setattr(stats,field,getattr(stats,field)-1)
            db.commit()
            db.refresh(stats)
        return stats
    
    except SQLAlchemyError as e:
        db.rollback()
        raise e
