from pydantic import BaseModel

class LogInBase(BaseModel):
    email:str
    password:str

class RegisterBase(BaseModel):
    name:str
    email:str
    password:str