from pydantic import BaseModel
from typing import Optional,List

class TaskCreate(BaseModel):
    title:str
    description:Optional[str]=None
    status_id:int
    priority_id:int

class TaskDeleteMultiple(BaseModel):
    ids:List[int]

class TaskUpdate(BaseModel):
    id:int
    title:str
    description:str
    priority_id:int
    status_id:int