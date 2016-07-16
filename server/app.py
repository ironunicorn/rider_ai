"""Top level app setup database and csrf protection."""
import os
from flask import Flask, jsonify
from flask_wtf.csrf import CsrfProtect
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError


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


"""Shared model error handlers."""
class AssertionError(Exception):
    pass

class InvalidRequestError(Exception):
    pass


@app.errorhandler(IntegrityError)
def integrity_error(error):
    return jsonify({"error": str(error)}), 422


@app.errorhandler(AssertionError)
def assertion_error(error):
    return jsonify({"error": str(error)}), 422


@app.errorhandler(InvalidRequestError)
def assertion_error(error):
    return jsonify({"error": str(error)}), 503
