from pydantic import BaseModel
from sqlalchemy import Date, TIMESTAMP
from datetime import datetime


class User(BaseModel):
    # id: int
    email: str
    first_name: str
    last_name: str
    patronymic: str
    Phone: str
    reqistered_time: datetime
    date_of_birth: datetime
    cosplay: bool
    story: bool
    picture: bool
    consent_to_processing: bool


class UserCreate(User):
    pass
