import unittest
from app import app, db
from models.user import User


class UserTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.db = db
        self.db.create_all()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all(app=self.app)
        self.db.get_engine(self.app).dispose()

    def test_user_save(self):
        user = User(email_address="me@gmail.com",
                    password="password")
        user.save()
        self.assertIsNotNone(user.id)

    def test_find_by_credentials(self):
        user = User(email_address="me@gmail.com",
                    password="password")
        user.save()
        get_user = User.find_by_credentials(email_address="me@gmail.com",
                                            password="password")
        self.assertIsNotNone(get_user)

    def test_does_not_find_by_invalid_credentials(self):
        user = User(email_address="me@gmail.com",
                    password="password")
        user.save()
        get_user = User.find_by_credentials(email_address="me@gmail.com",
                                            password="WrongPassword")
        self.assertIsNone(get_user)

    def test_user_invalid_email_address(self):
        with self.assertRaises(AssertionError):
            user = User(email_address="megmail.com",
                        password="password")

    def test_validates_correct_password(self):
        user = User(email_address="me@gmail.com",
                    password="password")
        user.save()
        self.assertTrue(user.check_password("password"))

    def test_invalidates_wrong_password(self):
        user = User(email_address="me@gmail.com",
                    password="password")
        user.save()
        self.assertFalse(user.check_password("WrongPassword"))


if __name__ == '__main__':
    unittest.main()
