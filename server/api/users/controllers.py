import os
import jwt
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from api.users.models import db, User


def create_user(username, password):
    if not username or not password or get_user_by_username(username):
        return

    user = User(
        username=username,
        password=generate_password_hash(password)
    )
    db.session.add(user)
    db.session.commit()


def get_user_by_username(username):
    return User.query.filter_by(username=username).first()


def get_user_by_id(id):
    return User.query.filter_by(id=id).first()


def check_password(user, password):
    return check_password_hash(user.password, password)


def generate_token(user):
    return jwt.encode(
        {
            "id": user.id,
            "exp": datetime.utcnow() + timedelta(minutes=30)
        },
        os.getenv("JWT_SECRET_KEY"),
        os.getenv("JWT_ALGORITHM")
    )
