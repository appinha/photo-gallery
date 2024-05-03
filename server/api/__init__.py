import os
from flask import Flask
from flask_cors import CORS
from api.database import db
from api.views import views
from api.users.controllers import create_user
from api.photos.controllers import import_photos_from_json


def setup_database(app, is_testing=False):
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST")
    db_name = os.getenv("DB_NAME")

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"postgresql://{db_user}:{db_password}@{db_host}/{db_name}"
    )

    with app.app_context():
        db.init_app(app)

        if is_testing:
            db.drop_all()

        from api.models import models  # noqa

        db.create_all()

        create_user(
            os.getenv("USER_ADMIN_USERNAME"), os.getenv("USER_ADMIN_PASSWORD")
        )
        import_photos_from_json("api/photos/photos.json")


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile("settings.py")

    if test_config:
        app.config.update(test_config)

    app.secret_key = os.getenv("APP_SECRET_KEY")

    setup_database(app, is_testing=bool(test_config))

    for view in views:
        app.register_blueprint(view, url_prefix="/api")

    return app
