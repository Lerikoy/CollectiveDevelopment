from pydantic import BaseModel
from sqlalchemy import Date, TIMESTAMP
from datetime import datetime


class CosplayBase(BaseModel):
    fandom: str
    name_character: str


class CosplayCreate(CosplayBase):
    pass


class Cosplay(CosplayBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class PictureBase(BaseModel):
    name: str
    


class PictureCreate(PictureBase):
    path_img: str


class Picture(PictureBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class StoryBase(BaseModel):
    name: str
    path_file: str


class StoryCreate(StoryBase):
    pass


class Story(StoryBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    first_name: str
    last_name: str
    patronymic: str
    Phone: str
    reqistered_time: datetime
    date_of_birth: datetime
    consent_to_processing: bool


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True
