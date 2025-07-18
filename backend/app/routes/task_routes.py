from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session 
from sqlalchemy.exc import SQLAlchemyError
from db.session import get_db
from services.task_service import fetch_tasks,add_task,delete_tasks,fetch_task_statuses,edit_task,fetch_task_priority,increment_counter,decrement_counter
from schemas.task_schema import TaskCreate,TaskDeleteMultiple,TaskUpdate

router = APIRouter(prefix="/task",tags=["Task"])


@router.get("/")
def get_tasks(db:Session=Depends(get_db)):
    try:
        return{"status":True,"res":{"tasks":fetch_tasks(db),
                                    "status":fetch_task_statuses(db),
                                    "priority":fetch_task_priority(db)},
                                    "message":""}
        # return fetch_task_statuses(db)
    except SQLAlchemyError as e:
        print(e)
        raise HTTPException(status_code=500,detail="Failed to get tasks")

@router.post("/")
def create_task(req:TaskCreate,db:Session=Depends(get_db)):
    try: 
        return {"status":True,
                "res":add_task(db=db,title=req.title,description=req.description,status_id=req.status_id,priority_id=req.priority_id),
                "message":""}
    except SQLAlchemyError as e:
        print(e)
        raise HTTPException(status_code=500,detail="Failed to create task")


@router.post("/delete")
def remove_multiple_tasks(req:TaskDeleteMultiple,db:Session=Depends(get_db)):
    try:
        return {"status":True,"res":delete_tasks(db=db,ids=req.ids),"message":""}
    except SQLAlchemyError as e:
        HTTPException(status_code=500,detail="Failed to delete multiple tasks")


@router.post("/update")
def update_task_status(req:TaskUpdate,db:Session=Depends(get_db)):
    try:
        edit_task(db=db,id=req.id,title=req.title,description=req.description,status_id=req.status_id,priority_id=req.priority_id)
        return {"status":True,"message":"task updated successfuly"}
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500,detail="couldn't update the task !!")

