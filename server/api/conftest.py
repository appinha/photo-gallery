import os
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
