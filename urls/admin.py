"""Admin routes for owner(s)."""
from flask import Blueprint, render_template
from models.contact import Contact


admin = Blueprint('admin', __name__)


@admin.route('/contacts', methods=['GET'])
def list_contacts():
    """
    Lists contacts.

    returns:
        HTML list of contacts.
    """
    contacts = Contact.query.order_by(Contact.created_timestamp.desc())

    return render_template('admin/contacts.html', contacts=contacts)
