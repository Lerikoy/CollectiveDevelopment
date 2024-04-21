from fastapi import Depends, FastAPI, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from crud import (get_user, get_user_by_email, get_users, create_user_cosplay, create_user_picture, create_user_story,       
                  get_cosplay, get_picture, get_story)
from schemas import UserCreate, UserBase, CosplayBase, CosplayCreate, StoryBase, StoryCreate, PictureBase, PictureCreate
from database import local_session_maker

import aiofiles
import json
from pathlib import Path
from typing import Union

app = FastAPI()


@app.get("/")
async def get_home():
    return {"data": "Hello world!"}


def get_db():
    db = local_session_maker()
    try:
        yield db
    finally:
        db.close()


@app.post("/cosplay/", response_model=UserBase)
def create_cosplay(user: UserCreate, cosplay: CosplayCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_cosplay(db=db, user=user, cosplay=cosplay)


@app.post("/picture/", response_model=UserBase)
async def create_picture(user_and_picture: Union[dict, str], file: UploadFile = File(...), db: Session = Depends(get_db)):
    if isinstance(user_and_picture, str):
        user_and_picture = json.loads(user_and_picture)

    user_data = user_and_picture.get("user")
    picture_data = user_and_picture.get("picture")
    if not user_data or not picture_data:
        raise HTTPException(status_code=400, detail="User data and picture data are required")

    db_user = get_user_by_email(db, email=user_data.get("email"))
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    out_file_path = Path("picture") / file.filename

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write
    picture_data["path_img"] = str(out_file_path)
    return create_user_picture(db=db, user=user_data, picture=picture_data)


@app.post("/story/", response_model=UserBase)
def create_story(user: UserCreate, story: StoryCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return create_user_story(db=db, user=user, story=story)


@app.get("/users/", response_model=list[UserBase])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=UserBase)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/cosplay/", response_model=list[CosplayBase])
def read_cosplay(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_cosplay(db, skip=skip, limit=limit)
    return items


@app.get("/picture/", response_model=list[PictureBase])
def read_picture(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_picture(db, skip=skip, limit=limit)
    return items


@app.get("/story/", response_model=list[StoryBase])
def read_story(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_story(db, skip=skip, limit=limit)
    return items
