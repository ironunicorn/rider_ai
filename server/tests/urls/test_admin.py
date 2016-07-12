import json
import unittest
from app import app, db
from urls.admin import admin
from models.contact import Contact
from models.user import User


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
        self.admin = User(email_address="ad@min.com",
                          password="password",
                          admin=True)
        self.admin.save()
        self.not_admin = User(email_address="not@admin.com",
                              password="123456",
                              admin=False)
        self.not_admin.save()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all(app=self.app)
        self.db.get_engine(self.app).dispose()

    def login(self, email_address, password):
        return self.test_client.post('/admin/login', data={
            "email_address": email_address,
            "password": password
        }, follow_redirects=True)

    def logout(self):
        return self.test_client.get('/admin/logout', follow_redirects=True)

    def test_contact_list(self):
        self.login(self.admin.email_address, "password")
        response = self.test_client.get('/admin/contacts')
        assert "Hi" in response.data

    def test_not_admin(self):
        self.login(self.not_admin.email_address, "123456")
        response = self.test_client.get('/admin/contacts',
                                        follow_redirects=True)
        assert "Hi" not in response.data


if __name__ == '__main__':
    unittest.main()
