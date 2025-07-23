from datetime import datetime,timedelta
from fastapi import HTTPException
from jose import JWTError,jwt
from passlib.context import CryptContext
from email_validator import validate_email
from services.usersService import get_user_by_id
from sqlalchemy.orm import Session
from fastapi import Request, Depends
from db.session import get_db
from core.config import ACCESS_TOKEN_EXPIRE_MINUTES, ALGORITHM,SECRET_KEY



def generate_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def check_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    

def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="No token provided")
    try:
        payload = check_token(token)
        user_id = payload.get("user_id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token payload")

        user = get_user_by_id(db,user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return user 
    
    except :
        raise HTTPException(status_code=401, detail="Invalid or expired token")

"-----------------------"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def valid_email(email:str):
    try:
        validate_email(email)
        return True
    except:
        return False