from app import db
from flask_login import UserMixin
from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    github_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(100))
    access_token = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Backup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    repository_name = db.Column(db.String(200))
    status = db.Column(db.String(20))
    started_at = db.Column(db.DateTime)
    completed_at = db.Column(db.DateTime)