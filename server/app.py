import os
from flask import Flask
from flask_cors import CORS
from api.views import views


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_pyfile('settings.py')
    app.secret_key = os.getenv("APP_SECRET_KEY")

    for view in views:
        app.register_blueprint(view, url_prefix="/api")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
