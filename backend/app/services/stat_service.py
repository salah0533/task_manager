from sqlalchemy.orm import Session
from sqlalchemy import func
from models.task_stats import TaskStats
from sqlalchemy.exc import SQLAlchemyError
from models.tasks import Task
from models.task_status import TaskStatus
from services.task_service import fetch_task_statuses

def fetch_stats(db:Session,user_id:int):
    try:
        stat = {k:v for k,v in db.query(TaskStats).filter(TaskStats.user_id==user_id).first().to_dict().items() }
        stat["added_counter"] = db.query(Task).filter(Task.user_id==user_id).count()
        
        status_counts = (
            db.query(TaskStatus.status, func.count(Task.id))
            .join(Task, Task.status_id == TaskStatus.id)
            .filter(Task.user_id == user_id)
            .group_by(TaskStatus.status)
            .all()
        )

        status_counts = {status:count for status,count in status_counts}
        aviable_status ={status[0]:0 for status in  db.query(TaskStatus.status).all()}

        stat.update(aviable_status)
        stat.update(status_counts)
        del stat['id']
        return stat
    
    except SQLAlchemyError as e:
        raise e

def add_init_stat(db:Session,user_id:int):
    try:
        new_stats = TaskStats(del_counter=0,edit_counter=0,user_id=user_id)
        db.add(new_stats)
        db.commit()
    except SQLAlchemyError as e:
        db.rollback()
        raise e