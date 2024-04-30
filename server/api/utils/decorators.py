from functools import wraps
from flask import request, make_response
from api.users.controllers import get_user_by_token


def token_required(func):

    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", None)

        if not token:
            return make_response({"message": "No token provided in authorization"}, 401)

        try:
            user = get_user_by_token(token)
        except Exception as e:
            return make_response({"message": "Invalid token"}, 401)

        return func(user, *args, **kwargs)

    return decorated
