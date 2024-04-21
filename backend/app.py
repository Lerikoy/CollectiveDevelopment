from fastapi import Depends, FastAPI, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from crud import (get_user, get_user_by_email, get_users, create_user_cosplay, create_user_picture, create_user_story,       
                  get_cosplay, get_picture, get_story, get_user_by_cosplay, get_user_by_picture, get_user_by_story,
                  create_only_cosplay, create_only_picture, create_only_story)
from schemas import UserCreate, UserBase, CosplayBase, CosplayCreate, StoryBase, PictureBase
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


@app.post("/cosplay/", response_model=Union[UserBase, CosplayBase])
def create_cosplay(user: UserCreate, cosplay: CosplayCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_email(db, email=user.email)
    if db_user:
        db_cosplay = get_user_by_cosplay(db, user_id=db_user.id)
        if db_cosplay:
            raise HTTPException(status_code=400, detail="User already registered in cosplay")
        else:
            return create_only_cosplay(db=db, cosplay=cosplay, user_id=db_user.id)
    return create_user_cosplay(db=db, user=user, cosplay=cosplay)


@app.post("/picture/", response_model=UserBase)
async def create_picture(user_and_picture: Union[dict, str], file: UploadFile = File(...), db: Session = Depends(get_db)):
    if isinstance(user_and_picture, str):
        user_and_picture = json.loads(user_and_picture)

    user_data = user_and_picture.get("user")
    picture_data = user_and_picture.get("picture")
    if not user_data or not picture_data:
        raise HTTPException(status_code=400, detail="User data and picture data are required")

    out_file_path = Path("picture") / file.filename

    db_user = get_user_by_email(db, email=user_data.get("email"))
    if db_user:
        db_picture = get_user_by_picture(db, user_id=db_user.id)
        if db_picture:
            raise HTTPException(status_code=400, detail="User already registered in picture")
        else:
            async with aiofiles.open(out_file_path, 'wb') as out_file:
                content = await file.read()
                await out_file.write(content)
            picture_data["path_img"] = str(out_file_path)
            return create_only_picture(db=db, picture=picture_data, user_id=db_user.id)
        
    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    picture_data["path_img"] = str(out_file_path)
    return create_user_picture(db=db, user=user_data, picture=picture_data)


@app.post("/story/", response_model=UserBase)
async def create_story(user_and_story: Union[dict, str], file: UploadFile = File(...), db: Session = Depends(get_db)):
    if isinstance(user_and_story, str):
        user_and_story = json.loads(user_and_story)

    user_data = user_and_story.get("user")
    story_data = user_and_story.get("story")
    if not user_data or not story_data:
        raise HTTPException(status_code=400, detail="User data and story data are required")

    out_file_path = Path("story") / file.filename

    db_user = get_user_by_email(db, email=user_data.get("email"))
    if db_user:
        db_story = get_user_by_story(db, user_id=db_user.id)
        if db_story:
            raise HTTPException(status_code=400, detail="User already registered in story")
        else:
            async with aiofiles.open(out_file_path, 'wb') as out_file:
                content = await file.read()  # async read
                await out_file.write(content)  # async write
            story_data["path_file"] = str(out_file_path)
            return create_only_story(db=db, story=story_data, user_id=db_user.id)

    async with aiofiles.open(out_file_path, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write
    story_data["path_file"] = str(out_file_path)
    return create_user_story(db=db, user=user_data, story=story_data)



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


@app.get("/cosplay/{user_id}")
def read_cosplay(user_id: int, db: Session = Depends(get_db)):
    items = get_user_by_cosplay(db, user_id = user_id)

    if not items:
        raise HTTPException(status_code=404, detail="Cosplay not found")
    return items


@app.get("/picture/{user_id}", response_class=FileResponse)
def read_picture(user_id: int, db: Session = Depends(get_db)):
    items = get_user_by_picture(db, user_id=user_id)
    if not items:
        raise HTTPException(status_code=404, detail="Picture not found")
    return items.path_img


@app.get("/story/{user_id}", response_class=FileResponse)
def read_story(user_id: int, db: Session = Depends(get_db)):
    items = get_user_by_story(db=db, user_id=user_id)
    if not items:
        raise HTTPException(status_code=404, detail="Story not found")
    return items.path_file



@app.get("/cosplay/", response_model=list[CosplayBase])
def read_cosplay_limit(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_cosplay(db, skip=skip, limit=limit)
    return items


@app.get("/picture/", response_model=list[PictureBase])
def read_picture_limit(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_picture(db, skip=skip, limit=limit)
    return items


@app.get("/story/", response_model=list[StoryBase])
def read_story_limit(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_story(db, skip=skip, limit=limit)
    return items
