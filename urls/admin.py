"""Admin routes for owner(s)."""
from functools import wraps
from flask import Blueprint, g, render_template, request, session, redirect, url_for
from models.contact import Contact
from models.user import User


admin = Blueprint('admin', __name__)


def ensure_admin(func):
    """Ensures current user is an admin or redirects to login page."""
    @wraps(func)
    def ensure_admin_wrapper(*args, **kwargs):
        user = current_user()
        if not user or not user.admin:
            return redirect(url_for('admin.login'))
        else:
            return func(*args, **kwargs)

    return ensure_admin_wrapper


def current_user():
    """Gets user from cache or caches current user."""
    if not g.get('user'):
        g.user = User.find_by_session_token(session['session_token'])

    return g.user


@admin.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user = User.find_by_credentials(request.form['email_address'],
                                        request.form['password'])
        if user:
            session['session_token'] = user.reset_session_token()
            return redirect(url_for('admin.list_contacts'))

        return render_template('admin/login.html',
                               errors='Invalid credentials. Please try again.')
    else:

        return render_template('admin/login.html', errors=None)


@admin.route('/logout', methods=['POST'])
@ensure_admin
def logout():
    user = current_user()
    session['session_token'] = None
    user.reset_session_token()
    g.user = None

    return redirect(url_for('admin.login'))


@admin.route('/contacts', methods=['GET'])
@ensure_admin
def list_contacts():
    """
    Lists contacts.

    returns:
        HTML list of contacts.
    """
    contacts = Contact.query.order_by(Contact.created_timestamp.desc())

    return render_template('admin/contacts.html', contacts=contacts)
