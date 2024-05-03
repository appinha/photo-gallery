from flask import jsonify, make_response, request
from flask.blueprints import Blueprint
from api.utils.decorators import token_required
from api.photos.controllers import (
    get_all_photos,
    create_photo_star,
    delete_photo_star,
)


photos = Blueprint("photos", __name__)


@photos.get("/photos")
@token_required
def get_photos(user):
    try:
        return make_response(jsonify({"photos": get_all_photos(user)}), 200)
    except Exception:
        return make_response("Internal error", 500)


@photos.post("/photos/star")
@token_required
def add_photo_star(user):
    data = request.json
    photo_id = data.get("id")

    if not (photo_id):
        return make_response("Photo id not provided", 400)

    try:
        create_photo_star(user.id, photo_id)
        return make_response("Photo star created", 201)
    except Exception:
        return make_response("Internal error", 500)


@photos.delete("/photos/star")
@token_required
def remove_photo_star(user):
    data = request.json
    photo_id = data.get("id")

    if not (photo_id):
        return make_response("Photo id not provided", 400)
    try:
        delete_photo_star(user.id, photo_id)
        return make_response("Photo star deleted", 200)
    except Exception:
        return make_response("Internal error", 500)
