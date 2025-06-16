from flask import current_app
from alembic import context
from app.models import db

config = context.config
config.set_main_option('sqlalchemy.url', current_app.config['SQLALCHEMY_DATABASE_URI'])
target_metadata = db.metadata