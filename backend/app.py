from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Application(BaseModel):
    name: str


@app.get("/")
async def get_home():
    return {"data": "Hello world!"}


@app.get("/getApplication")
async def get_application():
    application = Application(name="Ayil")
    return {"data": application}