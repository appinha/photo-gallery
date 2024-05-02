from sqlalchemy.sql import func
from api.database import db


class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password = db.Column(db.String(), nullable=False)
    created_at = db.Column(
        db.DateTime(timezone=True), server_default=func.now()
    )
    photo_star = db.relationship("PhotoStar", backref="User")

    def __repr__(self):
        return f"<User {self.username}, id {self.id}>"
