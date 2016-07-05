"""Model for messages submitted by users."""
import bcrypt
from app import db
from datetime import datetime
from sqlalchemy.orm import validates


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(), nullable=False)
    password_hash = db.Column(db.String())
    admin = db.Column(db.Boolean(), default=False)
    created_timestamp = db.Column(db.DateTime(), default=datetime.utcnow)

    @validates('email_address')
    def validate_email_address(self, key, address):
        assert address is not None
        assert address is not ""
        assert '@' in address
        return address

    def __init__(self, email_address, password, admin=False):
        self.email_address = email_address
        self.password_hash = bcrypt.hashpw(password, bcrypt.gensalt())
        self.admin = admin

    def save(self):
        success = True
        try:
            db.session.add(self)
            db.session.commit()
        except:
            success = False

        return success

    def check_password(self, password):
        attempt = bcrypt.hashpw(password.encode("utf-8"),
                                self.password_hash.encode("utf-8"))

        return attempt == self.password_hash.encode("utf-8")
