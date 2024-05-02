from dataclasses import dataclass
from sqlalchemy.sql import func
from api.database import db


@dataclass
class Photo(db.Model):
    __tablename__ = "Photo"
    id: int = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, unique=True, nullable=False)
    width = db.Column(db.Integer, nullable=False)
    height = db.Column(db.Integer, nullable=False)
    photographer_id = db.Column(db.Integer, nullable=False)
    photographer: str = db.Column(db.String, nullable=False)
    photographer_url: str = db.Column(db.String, nullable=False)
    alt: str = db.Column(db.String, nullable=False)
    avg_color: str = db.Column(db.String, nullable=False)
    src_original = db.Column(db.String, nullable=False)
    src_tiny: str = db.Column(db.String, nullable=False)
    src_small = db.Column(db.String, nullable=False)
    src_medium = db.Column(db.String, nullable=False)
    src_large = db.Column(db.String, nullable=False)
    src_large2x = db.Column(db.String, nullable=False)
    src_portrait = db.Column(db.String, nullable=False)
    src_landscape = db.Column(db.String, nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now()
    )
    photo_star = db.relationship("PhotoStar", backref="Photo")

    def __repr__(self):
        return f"<Photo {self.url}, id {self.id}>"

    def as_dict(self):
        return {
            column.name: getattr(self, column.name)
            for column in self.__table__.columns
        }


class PhotoStar(db.Model):
    __tablename__ = "PhotoStar"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("User.id"))
    photo_id = db.Column(db.Integer, db.ForeignKey("Photo.id"))
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now()
    )

    def __repr__(self):
        return (
            f"<PhotoStar id: {self.id}, "
            f"user_id: {self.user_id}, "
            f"photo_id: {self.photo_id}>"
        )
