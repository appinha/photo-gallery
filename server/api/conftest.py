import os
import json
import pytest
from api import create_app


@pytest.fixture(scope="session", autouse=True)
def set_env():
    os.environ["APP_SECRET_KEY"] = "app_secret_key"

    os.environ["DB_USER"] = "user"
    os.environ["DB_PASSWORD"] = "password"
    os.environ["DB_HOST"] = "localhost:5431"
    os.environ["DB_NAME"] = "postgres"

    os.environ["JWT_ALGORITHM"] = "HS256"
    os.environ["JWT_SECRET_KEY"] = "jwt_secret_key"

    os.environ["USER_ADMIN_USERNAME"] = "admin"
    os.environ["USER_ADMIN_PASSWORD"] = "123"


@pytest.fixture
def app():

    app = create_app({"TESTING": True})

    yield app


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def runner(app):
    return app.test_cli_runner()


_headers = {
    "Content-type": "application/json",
    "Accept": "application/json",
}


@pytest.fixture
def headers():
    return _headers


def _get_token(client):
    data = json.dumps({"username": "admin", "password": "123"})
    response = client.post("/api/users/sign-in", data=data, headers=_headers)
    return response.get_json()["token"]


@pytest.fixture
def auth_headers(client):
    return {
        **_headers,
        "Authorization": _get_token(client),
    }


@pytest.fixture
def photo_mock():
    return {
        "id": 21751820,
        "width": 3888,
        "height": 5184,
        "url": "https://www.pexels.com/photo/a-small-island-surrounded-by-trees-in-the-middle-of-a-lake-21751820/",
        "photographer": "Felix",
        "photographer_url": "https://www.pexels.com/@felix-57767809",
        "photographer_id": 57767809,
        "avg_color": "#333831",
        "src_original": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg",
        "src_large2x": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "src_large": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        "src_medium": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=350",
        "src_small": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&h=130",
        "src_portrait": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
        "src_landscape": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        "src_tiny": "https://images.pexels.com/photos/21751820/pexels-photo-21751820.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
        "alt": "A small island surrounded by trees in the middle of a lake",
    }
