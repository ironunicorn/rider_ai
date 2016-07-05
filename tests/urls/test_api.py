import json
import unittest
from app import app, db
from urls.api import api


class APITestCase(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.app.register_blueprint(api, url_prefix='/api')
        self.test_client = self.app.test_client()
        self.db = db
        self.db.create_all()

    def tearDown(self):
        self.db.session.remove()
        self.db.drop_all(app=self.app)
        self.db.get_engine(self.app).dispose()

    def test_contact_post(self):
        contact = {"name": "Irene",
                   "email_address": "irene.foelschow@gmail.com",
                   "message": "Hey!"}
        response = self.test_client.post('/api/contact',
                                         data=json.dumps(contact),
                                         headers={'X-Rider-AI': 1},
                                         content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(data["success"])

    def test_xssi(self):
        contact = {"name": "Irene",
                   "email_address": "irene.foelschow@gmail.com",
                   "message": "Hey!"}
        response = self.test_client.post('/api/contact',
                                         data=json.dumps(contact),
                                         content_type='application/json')
        self.assertEqual(response.status_code, 403)

    def test_invalid_contact_post(self):
        contact = {"name": "Irene",
                   "email_address": "irene.foelschow@gmail.com"}
        response = self.test_client.post('/api/contact',
                                         data=json.dumps(contact),
                                         headers={'X-Rider-AI': 1},
                                         content_type='application/json')
        self.assertEqual(response.status_code, 500)
        data = json.loads(response.data)
        self.assertFalse(data["success"])

    def test_invalid_email_contact_post(self):
        contact = {"name": "Irene",
                   "email_address": "irene.foelschowgmail.com",
                   "message": "Hey!"}
        response = self.test_client.post('/api/contact',
                                         data=json.dumps(contact),
                                         headers={'X-Rider-AI': 1},
                                         content_type='application/json')
        self.assertEqual(response.status_code, 500)
        data = json.loads(response.data)
        self.assertFalse(data["success"])

    def test_linear_regression(self):
        data = {'learn': open('tests/assets/iris.csv'),
                'predict': open('tests/assets/iris2.csv')}
        response = self.test_client.post('/api/linear_regression',
                                         headers={'X-Rider-AI': 1},
                                         data=data)
        data = json.loads(response.data)
        self.assertTrue(len(data["y_results"]))

    def test_all_mismatched_headers_linear_regression(self):
        data = {'learn': open('tests/assets/iris.csv'),
                'predict': open('tests/assets/data.csv')}
        response = self.test_client.post('/api/linear_regression',
                                         headers={'X-Rider-AI': 1},
                                         data=data)
        self.assertEqual(response.status_code, 400)

    def test_no_mismatched_headers_linear_regression(self):
        data = {'learn': open('tests/assets/iris.csv'),
                'predict': open('tests/assets/iris.csv')}
        response = self.test_client.post('/api/linear_regression',
                                         headers={'X-Rider-AI': 1},
                                         data=data)
        self.assertEqual(response.status_code, 400)

    def test_invalid_file_type_linear_regression(self):
        data = {'learn': open('tests/assets/iris.csv'),
                'predict': open('tests/assets/spacecat.jpg')}
        response = self.test_client.post('/api/linear_regression',
                                         headers={'X-Rider-AI': 1},
                                         data=data)
        self.assertEqual(response.status_code, 400)


if __name__ == '__main__':
    unittest.main()
