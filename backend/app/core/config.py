
from dotenv import load_dotenv
import os
from pathlib import Path



env_path = Path(__file__).resolve().parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

load_dotenv()


SECRET_KEY = os.getenv("SECRET_KEY")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
ALGORITHM = os.getenv("ALGORITHM")
DATABASE_URL = os.getenv("DATABASE_URL")
COKIE_MAX_AGE = os.getenv("COKIE_MAX_AGE")

SERVER_HOST = os.getenv("SERVER_HOST")
PORT = int(os.getenv("PORT"))

