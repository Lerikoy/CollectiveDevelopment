from sqlalchemy import MetaData, Integer, String, TIMESTAMP, ForeignKey, Table, Column, JSON
from datetime import datetime

metaData = MetaData()

roles = Table(
    "discipline", 
    metaData,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("disc_name", String, nullable=False),
    Column("video_path", String, nullable=True),
    Column("img_path", String, nullable=True),
)

users = Table(
    "users",
    metaData,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("first_name", String, nullable=False),
    Column("last_name", String, nullable=False),
    Column("patronymic", String, nullable=True),
    Column("Phone", String, nullable=False),
    Column("reqistered_time", TIMESTAMP, default=datetime.utcnow),
)