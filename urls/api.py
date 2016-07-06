"""API routes for external users."""
from flask import Blueprint, abort, request, jsonify
import numpy
import pandas
from models.contact import Contact
from riderml.regression.SGD_regressor import SGD_regressor


api = Blueprint('api', __name__)


@api.before_request
def check_xssi():
    """Protects API from cross site script inclusion."""
    token = request.headers.get('X-Rider-AI')
    if not token or token != '1': abort(403)


@api.route('/contact', methods=['POST'])
def post_contact():
    """
    Adds contact.

    request body must specify as json:
        name - name of contact.
        email_address - email address of contact.
        message - a message.

    returns:
        json success or failure plus corresponding http status.
    """
    contact_request = request.get_json()
    try:
        contact = Contact(**contact_request)
        success = contact.save()
    except:
        success = False
    status = 200 if success else 500

    return jsonify({"success": success}), status


@api.route('/linear_regression', methods=['POST'])
def linear_regression():
    """
    Applies gradient descent linear regression algorithm to learn and then
    predict from two given CSV files.

    request body must contain two files as multipart file object:
        learn - the file to learn with.
        predict - the file to make predictions for.

    returns:
        A json object with the following fields:
        {"y_results": y_results,
         "x_results": second_x.tolist(),
         "y_fields": difference_columns,
         "x_fields": intersection_columns}
    """
    learn_file = request.files['learn']
    predict_file = request.files['predict']
    # if not validate_file(learn_file) or not validate_file(predict_file):
    return jsonify({"error": "Invalid file type or size"}), 400

    learn = pandas.read_csv(learn_file)
    learn_headers = list(learn.columns.values)
    predict = pandas.read_csv(predict_file)
    predict_headers = list(predict.columns.values)

    intersection_columns = list(set(learn_headers) & set(predict_headers))
    difference_columns = list(set(learn_headers) - set(predict_headers))

    if not intersection_columns or not difference_columns:
        return jsonify({"error": "You must have both x and y columns."}), 400

    x = learn.xs(intersection_columns, axis=1).as_matrix()
    y = learn.xs(difference_columns, axis=1).as_matrix()

    sgd_regressor = SGD_regressor()
    sgd_regressor.fit(x, y, 100)

    second_x = predict.xs(intersection_columns, axis=1).as_matrix()

    y_results = sgd_regressor.predict(second_x).tolist()

    return jsonify({"y_results": y_results,
                    "x_results": second_x.tolist(),
                    "y_fields": difference_columns,
                    "x_fields": intersection_columns})


def validate_file(file_to_validate):
    _, file_type = file_to_validate.filename.split(".")
    file_size = file_to_validate.content_length

    return file_type.lower() == "csv" and file_size <= 1000000
