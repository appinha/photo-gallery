import os


user_by_username = {
    "admin": {
        "username": os.getenv("USER_ADMIN_USERNAME"),
        "password": os.getenv("USER_ADMIN_PASSWORD"),
        "token": "mock_token"
    }
}


def get_user_by_username(username):
    return user_by_username.get(username)


def check_password(user, password):
    return user["password"] == password


def generate_token(user):
    return user["token"]
