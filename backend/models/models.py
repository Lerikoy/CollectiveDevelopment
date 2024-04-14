from sqlalchemy import MetaData, Integer, String, TIMESTAMP, ForeignKey, Table, Column, Date, Boolean
from datetime import datetime

metaData = MetaData()

cosplays = Table(
    "cosplay", 
    metaData,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("fandom", String, nullable=True),
    Column("name_character", String, nullable=False),
)

stories = Table(
    "story", 
    metaData,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("name", String, nullable=True),
    Column("path_file", String, nullable=False),
)

pictures = Table(
    "picture", 
    metaData,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("name", String, nullable=True),
    Column("path_img", String, nullable=False),
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
    Column("date_of_birth", Date, nullable=False),
    Column("cosplay", Boolean, default=False),
    Column("story", Boolean, default=False),
    Column("picture", Boolean, default=False),
    Column("consent_to_processing", Boolean, default=False),
)