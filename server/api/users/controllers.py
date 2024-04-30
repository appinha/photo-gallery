import os


user_by_username = {
    "admin": {
        "username": os.getenv("USER_ADMIN_USERNAME"),
        "password": os.getenv("USER_ADMIN_PASSWORD"),
        "token": "mock_token",
    }
}


user_by_token = {
    "mock_token": user_by_username["admin"],
}


def get_user_by_username(username):
    return user_by_username.get(username)


def get_user_by_token(token):
    return user_by_token[token]


def check_password(user, password):
    return user["password"] == password


def generate_token(user):
    return user["token"]
