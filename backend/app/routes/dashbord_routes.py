from fastapi import APIRouter,Depends,HTTPException
from db.session import get_db
from sqlalchemy.orm import Session
from services.stat_service import fetch_stats
from sqlalchemy.exc import SQLAlchemyError
from services.authService import get_current_user
from models.users import Users

router = APIRouter(prefix="/dashbord",tags=["Dashbord"])

@router.get("/stats")
def get_stats(db:Session=Depends(get_db),users:Users=Depends(get_current_user)):
    try:
        return {"status":True,"res":fetch_stats(db,user_id=users.id)}
    except SQLAlchemyError as e:
        print(e)
        raise HTTPException(status_code=500,detail="Failed to get stats")