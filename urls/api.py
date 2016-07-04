"""API routes for external users."""
from flask import Blueprint, request, jsonify
import numpy
import pandas
from models.contact import Contact
from riderml.regression.SGD_regressor import SGD_regressor


api = Blueprint('api', __name__)


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
    Applies gradient decsent linear regression algorithm to learn and then
    predict two given CSV files.

    request body must contain two files as multipart file object:
        learn - the file to learn with.
        predict - the file to make predictions for.

    returns:
        the y values of the prediction as a 2d array on success.
    """
    learn = pandas.read_csv(request.files['learn'])
    learn_headers = set(learn.columns.values)

    predict = pandas.read_csv(request.files['predict'])
    predict_headers = set(predict.columns.values)

    x_columns = learn_headers & predict_headers
    y_columns = learn_headers - predict_headers

    if not x_columns or not y_columns:
        return jsonify({"error": "You must have both x and y columns."}), 400

    x = [learn[column].tolist() for column in x_columns]
    y = [learn[column].tolist() for column in y_columns]

    x = numpy.array(zip(*x))
    y = numpy.array(zip(*y))

    sgd_regressor = SGD_regressor()
    sgd_regressor.fit(x, y, 100)

    predict_x = [predict[column].tolist() for column in x_columns]
    second_x = numpy.array(zip(*predict_x))

    answer = sgd_regressor.predict(second_x).tolist()

    return jsonify({"answer": answer})
