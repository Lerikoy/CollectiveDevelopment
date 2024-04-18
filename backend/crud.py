from sqlalchemy.orm import Session

from database import User, Cosplay, Picture, Story
from schemas import UserCreate, CosplayCreate, PictureCreate, StoryCreate


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


# def create_users(db: Session, user: UserCreate):
#     db_user = User(**user.dict())
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


def create_user_cosplay(db: Session, user: UserCreate, cosplay: CosplayCreate):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_item = Cosplay(**cosplay.dict(), user_id=db_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def create_user_picture(db: Session, user: UserCreate, picture: PictureCreate):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_item = Picture(**picture.dict(), user_id=db_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def create_user_story(db: Session, user: UserCreate, story: StoryCreate):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    db_item = Story(**story.dict(), user_id=db_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_cosplay(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Cosplay).offset(skip).limit(limit).all()


def get_picture(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Picture).offset(skip).limit(limit).all()


def get_story(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Story).offset(skip).limit(limit).all()
