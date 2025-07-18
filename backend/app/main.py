from fastapi import FastAPI
from db.session import engine
from db.base import Base
from routes.task_routes import router as task_routes
from routes.dashbord_routes import router as dashbord_routes
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],             
)

app.include_router(task_routes)
app.include_router(dashbord_routes)

