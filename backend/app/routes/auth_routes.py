from fastapi import APIRouter,Depends,Response,HTTPException
from services.authService  import generate_token,hash_password,verify_password
from schemas.authSchemas import LogInBase,RegisterBase
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session
from services.usersService import user_exist,add_user,get_user_by_email
from models.users import Users
from services.authService import valid_email
from db.session import get_db


router = APIRouter(prefix="/auth",tags=["Auth"])

@router.post("/login")
def login(req:LogInBase, response: Response,db: Session = Depends(get_db)):
     try:
        user = get_user_by_email(db,req.email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
    
        if not verify_password(req.password,user.hashedpass):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = generate_token({"id": user.id})
        response.set_cookie(
            key="access_token",
            value=token,
            httponly=True,
            max_age=60 * 60,
            samesite="Lax",
            secure=False,
        )
        return {"message": "Login successful"}
     except SQLAlchemyError as e:
         raise HTTPException(status_code=500,detail="error")


@router.post("/register")
def register(req: RegisterBase, db: Session = Depends(get_db)):
    if not valid_email(req.email):
        raise HTTPException(status_code=500,detail="not valid email")
    
    existing_user = user_exist(db,req.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashpass = hash_password(req.password)

    try:
        user = add_user(db,name =req.name,email=req.email,hashedpass=hashpass)
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500,detail="couldn't register a new user")

    return {"message": "User registered successfully"}