"""Top level app setup database and csrf protection."""
import os
from flask import Flask
from flask_wtf.csrf import CsrfProtect
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__, static_folder='client', static_url_path='/client')
app.config.from_object(os.environ['APP_SETTINGS'])
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CsrfProtect(app)
db = SQLAlchemy(app)


@app.after_request
def add_csrf_cookie(response):
    """Gives single page app access to CSRF token via cookie."""
    response.set_cookie('csrf_token',
                        value=app.jinja_env.globals['csrf_token']())

    return response
