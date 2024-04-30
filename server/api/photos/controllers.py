import json
from api.photos.models import db, Photo


def get_all_photos(user):
    photos = Photo.query.all()

    return [
        {**photo.as_dict(), 'is_starred': False}
        for photo in photos
    ]


def get_photo_by_url(url):
    return Photo.query.filter_by(url=url).first()


def create_photo_like():
    pass


def delete_photo_like():
    pass


def import_photos_from_json(file):
    with open(file, "r") as f:
        photos = json.load(f)
        photo_entries = []

        for photo in photos:
            if (get_photo_by_url(photo['url'])):
                return
            new_entry = Photo(**photo)
            photo_entries.append(new_entry)

        db.session.add_all(photo_entries)
        db.session.commit()
        f.close()
