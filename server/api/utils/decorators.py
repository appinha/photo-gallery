import os
import jwt
from functools import wraps
from flask import request, make_response
from api.users.controllers import get_user_by_id


def token_required(func):

    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization", None)

        if not token:
            return make_response("No token provided in authorization", 401)

        try:
            data = jwt.decode(
                token,
                os.getenv("JWT_SECRET_KEY"),
                algorithms=os.getenv("JWT_ALGORITHM"),
            )
            user = get_user_by_id(data["id"])
        except Exception:
            return make_response("Invalid token", 401)

        return func(user, *args, **kwargs)

    return decorated
