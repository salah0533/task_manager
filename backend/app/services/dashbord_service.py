from sqlalchemy.orm import Session
from sqlalchemy import func
from models.task_stats import TaskStats
from sqlalchemy.exc import SQLAlchemyError
from models.tasks import Task
from models.task_status import TaskStatus
from services.task_service import fetch_task_statuses

def fetch_stats(db:Session):
    try:
        stat = {k:v for k,v in db.query(TaskStats).first().to_dict().items() }
        status_counts = (
            db.query(TaskStatus.status, func.count(Task.id))
            .join(Task, Task.status_id == TaskStatus.id)
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
        print(e)
        raise e
