import sys
import os

# Добавляем путь к корневой директории проекта в sys.path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.insert(0, project_root)


from fastapi.testclient import TestClient
from app import app


client = TestClient(app=app)

def test_get_hone():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"data": "Hello world!"}


def test_read_users():
    response = client.get("/users/")

    assert response.status_code == 200
    assert isinstance(response.json(), list)
    
    for user in response.json():
        assert "email" in user
        assert "first_name" in user
        assert "last_name" in user
        assert "patronymic" in user
        assert "Phone" in user
        assert "date_of_birth" in user
        assert "reqistered_time" in user
        assert "consent_to_processing" in user

def test_read_user():
    user_id = 1
    response = client.get(f"/users/{user_id}")
    assert response.status_code == 200
    print(response.json())
    expected_keys = ["email", "first_name", "last_name", "patronymic", "Phone", "reqistered_time", "date_of_birth", "consent_to_processing"]
    assert all(key in response.json() for key in expected_keys)

def test_read_cosplays():
    response = client.get(f"/cosplay/")
    assert response.status_code == 200

    for cosplay in response.json():
        assert "fandom" in cosplay
        assert "name_character" in cosplay

# def test_read_cosplay():
#     user_id = 2
#     response = client.get(f"/cosplay/{user_id}")
#     assert response.status_code == 200

#     expected_keys = ["fandom", "name_character"]
#     assert all(key in response.json() for key in expected_keys)

def test_read_pictures():
    response = client.get(f"/picture/")
    assert response.status_code == 200

    for cosplay in response.json():
        assert "name" in cosplay

# def test_read_picture():
#     user_id = 2
#     response = client.get(f"/picture/{user_id}")
#     assert response.status_code == 200
#     assert response.content


def test_read_storys():
    response = client.get(f"/story/")
    assert response.status_code == 200

    for cosplay in response.json():
        assert "name" in cosplay

# def test_read_story():
#     user_id = 8
#     response = client.get(f"/story/{user_id}")
#     assert response.status_code == 200
#     assert response.content
    