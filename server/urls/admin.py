"""Admin routes for owner(s)."""
from functools import wraps
from flask import Blueprint, g, redirect, render_template, request, session,  url_for
from models.contact import Contact
from models.user import User


admin = Blueprint('admin', __name__)


def ensure_admin(func):
    """
    Decorator for routes that can only be accessed by admins.

    args:
        func- the function to be protected.

    returns:
        the called func and its arguments if the user is an admin.
        Otherwise, redirects to the login page.
    """
    @wraps(func)
    def ensure_admin_wrapper(*args, **kwargs):
        user = current_user()
        if not user or not user.admin:
            return redirect(url_for('admin.login_page'))

        return func(*args, **kwargs)

    return ensure_admin_wrapper


def current_user():
    """Gets user from cache or caches current user found by session token."""
    if not g.get('user'):
        g.user = User.find_by_session_token(session.get('session_token'))

    return g.user


@admin.route('/login', methods=['POST'])
def login_post():
    user = User.find_by_credentials(request.form['email_address'],
                                    request.form['password'])
    if not user:
        errors = 'Invalid credentials. Please try again.'
        return render_template('admin/login.html', errors=errors)

    session['session_token'] = user.reset_session_token()

    return redirect(url_for('admin.list_contacts'))


@admin.route('/login', methods=['GET'])
def login_page():

    return render_template('admin/login.html', errors=None)


@admin.route('/logout', methods=['POST'])
@ensure_admin
def logout():
    user = current_user()
    session['session_token'] = None
    user.reset_session_token()
    g.user = None

    return redirect(url_for('admin.login_page'))


@admin.route('/contacts', methods=['GET'])
@ensure_admin
def list_contacts():
    contacts = Contact.query.order_by(Contact.created_timestamp.desc())

    return render_template('admin/contacts.html', contacts=contacts)
