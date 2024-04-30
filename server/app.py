import os
from flask import Flask
from flask_cors import CORS
from api.database import db
from api.views import views
from api.users.controllers import create_user
from api.photos.controllers import import_photos_from_json


def setup_database(app):
    db_user = os.getenv("DB_USER")
    db_password = os.getenv("DB_PASSWORD")
    db_host = os.getenv("DB_HOST")

    app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{db_user}:{db_password}@{db_host}"

    with app.app_context():
        db.init_app(app)

        from api.models import models
        db.create_all()

        create_user(os.getenv("USER_ADMIN_USERNAME"), os.getenv("USER_ADMIN_PASSWORD"))
        import_photos_from_json("api/photos/photos.json")


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile('settings.py')
    app.secret_key = os.getenv("APP_SECRET_KEY")

    setup_database(app)

    for view in views:
        app.register_blueprint(view, url_prefix="/api")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
