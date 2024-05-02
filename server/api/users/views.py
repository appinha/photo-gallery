from flask import request, make_response
from flask.blueprints import Blueprint
from api.users.controllers import (
    get_user_by_username,
    check_password,
    generate_token,
)


users = Blueprint("users", __name__)


@users.post("/users/sign-in")
def sign_in():
    auth = request.json

    if not auth or not auth.get("username") or not auth.get("password"):
        return make_response("Proper credentials were not provided", 401)

    username = auth.get("username")
    password = auth.get("password")
    user = get_user_by_username(username)

    if not user:
        return make_response("User does not exist", 401)

    if check_password(user, password):
        token = generate_token(user)
        return make_response({"token": token}, 200)
    else:
        return make_response("Incorrect password", 401)
