import json
from api.photos.models import db, Photo, PhotoStar


def get_all_photos(user):
    subquery = (
        db.session.query(PhotoStar.photo_id)
        .filter_by(user_id=user.id)
        .subquery()
    )
    photos = (
        db.session.query(
            Photo, subquery.c.photo_id.isnot(None).label("is_starred")
        )
        .outerjoin(subquery, Photo.id == subquery.c.photo_id)
        .all()
    )

    return [
        {**photo.as_dict(), "is_starred": is_starred}
        for photo, is_starred in photos
    ]


def get_photo_by_url(url):
    return Photo.query.filter_by(url=url).first()


def ger_user_photo_star(user_id, photo_id):
    return PhotoStar.query.filter_by(
        user_id=user_id, photo_id=photo_id
    ).first()


def create_photo_star(user_id, photo_id):
    if not user_id or not photo_id or ger_user_photo_star(user_id, photo_id):
        return

    photo_star = PhotoStar(user_id=user_id, photo_id=photo_id)
    db.session.add(photo_star)
    db.session.commit()


def delete_photo_star(user_id, photo_id):
    if (
        not user_id
        or not photo_id
        or not ger_user_photo_star(user_id, photo_id)
    ):
        return

    PhotoStar.query.filter_by(user_id=user_id, photo_id=photo_id).delete()
    db.session.commit()


def import_photos_from_json(file):
    with open(file, "r") as f:
        photos = json.load(f)
        photo_entries = []

        for photo in photos:
            if get_photo_by_url(photo["url"]):
                return
            new_entry = Photo(**photo)
            photo_entries.append(new_entry)

        db.session.add_all(photo_entries)
        db.session.commit()
        f.close()
