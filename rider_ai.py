"""Run app from here."""

from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand
from flask import render_template

from app import app, db
from urls.api import api
from urls.admin import admin


app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(admin, url_prefix='/admin')

@app.route('/', methods=['GET'], defaults={'path': ''})
@app.route('/<path:path>', methods=['GET'])
def hello(path):
    """Returns base template for homepage."""

    return render_template('base.html')


migrate = Migrate(app, db)
manager = Manager(app)


manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run()
