"""Model for admins. Made flexible for other users later."""
import bcrypt
import uuid
from app import db
from datetime import datetime
from sqlalchemy.orm import validates


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email_address = db.Column(db.String(), nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
    admin = db.Column(db.Boolean(), default=False)
    session_token = db.Column(db.String())
    created_timestamp = db.Column(db.DateTime(), default=datetime.utcnow)

    @classmethod
    def find_by_credentials(cls, email_address, password):
        user = cls.query.filter(cls.email_address==email_address).first()
        if user and user.check_password(password):
            return user

    @classmethod
    def find_by_session_token(cls, session_token):
        return cls.query.filter(cls.session_token==session_token).first()

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

    def check_password(self, password):
        attempt = bcrypt.hashpw(password.encode("utf-8"),
                                self.password_hash.encode("utf-8"))

        return attempt == self.password_hash.encode("utf-8")

    def ensure_session_token(self):
        if self.session_token: return
        self.session_token = generate_session_token()

    def reset_session_token(self):
        self.session_token = generate_session_token()
        self.save()

        return self.session_token

    def save(self):
        self.ensure_session_token()
        db.session.add(self)
        db.session.commit()

        return self.id

def generate_session_token():
    return uuid.uuid4().hex
