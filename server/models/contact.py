"""Model for messages submitted by users."""
from app import db
from datetime import datetime
from sqlalchemy.orm import validates


class Contact(db.Model):
    __tablename__ = 'contacts'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    email_address = db.Column(db.String(), nullable=False)
    message = db.Column(db.Text(), nullable=False)
    created_timestamp = db.Column(db.DateTime(), default=datetime.utcnow)

    @validates('email_address')
    def validate_email_address(self, key, address):
        assert address is not None
        assert address is not ""
        assert '@' in address

        return address

    @validates('name', 'message')
    def validate_not_empty(self, key, field):
        assert field is not None
        assert field is not ""

        return field

    def __repr__(self):
        return '<id {}, name {}>'.format(self.id, self.name)

    def save(self):
        db.session.add(self)
        db.session.commit()

        return self.id
