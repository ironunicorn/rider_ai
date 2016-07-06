import unittest
import json
from app import app, db
from urls.admin import admin
from models.contact import Contact


class AdminTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.app.register_blueprint(admin, url_prefix='/admin')
        self.test_client = self.app.test_client()
        self.db = db
        self.db.create_all()
        contact = Contact(name="Irene",
                          email_address="irene@gmail.com",
                          message="Hi")
        contact.save()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all(app=self.app)
        self.db.get_engine(self.app).dispose()

    def test_contact_list(self):

        response = self.test_client.get('/admin/contacts')
        assert "Irene" in response.data


if __name__ == '__main__':
    unittest.main()
