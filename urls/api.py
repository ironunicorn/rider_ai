"""API routes for external users."""
from flask import Blueprint, request, jsonify
import csv
import numpy
from models.contact import Contact
from riderml.regression.SGD_regressor import SGD_regressor


api = Blueprint('api', __name__)


@api.route('/contact', methods=['POST'])
def post_contact():
    """Adds contact."""
    contact_request = request.get_json()
    try:
        contact = Contact(**contact_request)
        success = contact.save()
    except:
        success = False
    status = 200 if success else 500

    return jsonify({"success": success}), status


# @api.route('/linear_regression', methods=['POST'])
@api.route('/linear_regression', methods=['GET'])
def linear_regression():
    # learn_file = request.files['learn'].read()
    # learn = csv.DictReader(learn_file)
    # for row in learn:
    #     print str(row)
    #
    # predict_file = request.files['predict'].read()
    # predict = csv.DictReader(predict_file)
    # for row in predict:
    #     print str(row)
    x = numpy.zeros([10, 1])
    x[:, 0] = range(len(x))

    y = numpy.zeros([10, 1])
    y[:, 0] = range(len(x))
    y *= 2

    sgd_regressor = SGD_regressor()
    sgd_regressor.fit(x, y, 100)

    data = [6, 7, 8, 9, 10]
    y_guesses = sgd_regressor.predict(numpy.array(data).T)

    flattened_y_guesses = [item for sublist in y_guesses for item in sublist]
    answer = zip(data, flattened_y_guesses)

    return jsonify({"x": str(x), "y": str(y), "answer": answer})
