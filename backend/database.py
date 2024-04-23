from typing import AsyncGenerator
from datetime import datetime
from fastapi import Depends
from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Date, create_engine, ForeignKey
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker, relationship

from config import DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER

import os

DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

Base: DeclarativeMeta = declarative_base()

engine = create_engine(DATABASE_URL)
local_session_maker = sessionmaker(engine, expire_on_commit=False)


if not os.path.exists("picture"):
    os.makedirs("picture")

if not os.path.exists("story"):
    os.makedirs("story")


def get_db():
    db = local_session_maker()
    try:
        yield db
    finally:
        db.close()

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
    consent_to_processing: bool = Column(Boolean, default=False)

    cosplay = relationship("Cosplay", back_populates="owner")
    story = relationship("Story", back_populates="owner")
    picture = relationship("Picture", back_populates="owner")


class Cosplay(Base):
    __tablename__ = "cosplay"

    id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, ForeignKey("users.id"))
    fandom: str = Column(String, nullable=True)
    name_character: str = Column(String, nullable=False)

    owner = relationship("User", back_populates="cosplay")


class Story(Base):
    __tablename__ = "story"
    id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, ForeignKey("users.id"))
    name: str = Column(String, nullable=True)
    path_file: str = Column(String, nullable=False)

    owner = relationship("User", back_populates="story")


class Picture(Base):
    __tablename__ = "picture"

    id: int = Column(Integer, primary_key=True)
    user_id: int = Column(Integer, ForeignKey("users.id"))
    name: str = Column(String, nullable=True)
    path_img: str = Column(String, nullable=False)

    owner = relationship("User", back_populates="picture")