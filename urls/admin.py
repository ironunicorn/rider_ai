"""Admin routes for owner(s)."""
from flask import Blueprint, render_template
from models.contact import Contact
from models.user import User


admin = Blueprint('admin', __name__)


@admin.route('/login', methods=['GET', 'POST'])
def login():
    pass


@admin.route('/logout', methods=['DELETE'])
def logout():
    pass


@admin.route('/contacts', methods=['GET'])
def list_contacts():
    """
    Lists contacts.

    returns:
        HTML list of contacts.
    """
    contacts = Contact.query.order_by(Contact.created_timestamp.desc())

    return render_template('admin/contacts.html', contacts=contacts)
