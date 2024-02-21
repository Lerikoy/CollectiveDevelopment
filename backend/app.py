from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Application(BaseModel):
    name: str
    email: str


@app.get("/")
async def get_home():
    return {"message": "Hello World"}


@app.get("/getApplication")
async def get_application():
    application = Application(name="Ayil", email="ayil@mail.ru")
    return {"data": application}