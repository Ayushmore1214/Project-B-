import os

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key')
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///backup.db')
GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID', 'dummy-id')
GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET', 'dummy-secret')
GCS_BUCKET_NAME = os.getenv('GCS_BUCKET_NAME', 'your-default-bucket-name')
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')

