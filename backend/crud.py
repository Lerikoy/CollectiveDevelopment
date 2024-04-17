from sqlalchemy.orm import Session

from database import User
from schemas import UserCreate


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def create_users(db: Session, user: UserCreate):
    db_user = User(email=user.email, first_name=user.first_name, 
                            last_name=user.last_name, patronymic=user.patronymic, 
                            Phone=user.Phone, reqistered_time=user.reqistered_time, 
                            date_of_birth=user.date_of_birth, cosplay=user.cosplay, 
                            consent_to_processing=user.consent_to_processing)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user