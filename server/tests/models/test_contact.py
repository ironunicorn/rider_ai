import unittest
from app import app, db
from models.contact import Contact
from sqlalchemy.exc import IntegrityError


class ContactTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.db = db
        self.db.create_all()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all(app=self.app)
        self.db.get_engine(self.app).dispose()

    def test_contact_save(self):
        contact = Contact(name="Irene",
                          email_address="irene.foelschow@gmail.com",
                          message="Hey.")
        contact.save()
        self.assertIsNotNone(contact.id)

    def test_contact_invalid_email_address(self):
        with self.assertRaises(AssertionError):
            Contact(name="Irene",
                    email_address="irene.foelschowgmail.com",
                    message="Hey.")

    def test_contact_invalid_null_field(self):
        contact = Contact(name="Irene",message="Hey.")
        with self.assertRaises(IntegrityError):
            contact.save()

        self.assertIsNone(contact.id)


if __name__ == '__main__':
    unittest.main()
