import json


def get_all_photos(user):
    with open("api/photos/photos.json", "r") as f:
        photos = json.load(f)
        f.close()

    return [{**photo, 'is_starred': False} for photo in photos]
