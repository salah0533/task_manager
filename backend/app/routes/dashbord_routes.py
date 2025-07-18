from fastapi import APIRouter,Depends,HTTPException
from db.session import get_db
from sqlalchemy.orm import Session
from services.dashbord_service import fetch_stats
from sqlalchemy.exc import SQLAlchemyError

router = APIRouter(prefix="/dashbord",tags=["Dashbord"])

@router.get("/stats")
def get_stats(db:Session=Depends(get_db)):
    try:
        return {"status":True,"res":fetch_stats(db)}
    except SQLAlchemyError as e:
        print(e)
        raise HTTPException(status_code=500,detail="Failed to get stats")