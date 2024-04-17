from typing import AsyncGenerator
from datetime import datetime
from fastapi import Depends
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Date, create_engine
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker

from config import DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

Base: DeclarativeMeta = declarative_base()

engine = create_engine(DATABASE_URL)
local_session_maker = sessionmaker(engine, expire_on_commit=False)

class User(Base):
    __tablename__ = "users"

    id: int = Column(Integer, primary_key=True)
    email: str =  Column(String, nullable=False)
    first_name: str = Column(String, nullable=False)
    last_name: str = Column(String, nullable=False)
    patronymic: str = Column(String, nullable=True)
    Phone: str = Column(String, nullable=False)
    reqistered_time: datetime = Column(TIMESTAMP, default=datetime.now)
    date_of_birth: datetime = Column(Date, nullable=False)
    cosplay: bool = Column(Boolean, default=False)
    story: bool = Column(Boolean, default=False)
    picture: bool = Column(Boolean, default=False)
    consent_to_processing: bool = Column(Boolean, default=False)
