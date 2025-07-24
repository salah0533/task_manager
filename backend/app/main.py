from fastapi import FastAPI
import uvicorn
from core.config import PORT,SERVER_HOST
from db.session import engine
from db.base import Base
from routes.task_routes import router as task_routes
from routes.dashbord_routes import router as dashbord_routes
from fastapi.middleware.cors import CORSMiddleware
from routes.auth_routes import router as auth_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins= [
    "http://localhost:3000", 
    "http://127.0.0.1:3000"],        
    allow_credentials=True,
    allow_methods=["*"],           
    allow_headers=["*"],             
)

app.include_router(task_routes)
app.include_router(dashbord_routes)
app.include_router(auth_routes)


if __name__ == "__main__":
    uvicorn.run(app, host=SERVER_HOST, port=PORT)