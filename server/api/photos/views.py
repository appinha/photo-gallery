from flask import jsonify, make_response
from flask.blueprints import Blueprint
from api.utils.decorators import token_required
from api.photos.controllers import get_all_photos


photos = Blueprint('photos', __name__)


@photos.get("/photos")
@token_required
def get_photos(user):
    try:
        return make_response(jsonify({ "photos": get_all_photos(user)}), 200)
    except Exception:
        return make_response({"message": "Internal error"}, 500)

