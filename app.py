"""Top level app setup."""

import os
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__, static_folder='client', static_url_path='/client')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
