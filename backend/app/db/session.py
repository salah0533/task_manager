from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import json
from core.config import load_keys

KEYS = load_keys()

engine = create_engine(KEYS["DATABASE_URL"])
SessionLocal = sessionmaker(bind=engine,autoflush=False,autocommit=False)


def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()