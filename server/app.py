import os
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config.from_pyfile('settings.py')
app.secret_key = os.getenv("APP_SECRET_KEY")


@app.get("/api/")
def hello_world():
    return "Hello world"


if __name__ == "__main__":
    app.run()
