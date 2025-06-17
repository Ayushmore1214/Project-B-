import os

class Config:
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev-secret-key')
SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///backup.db')
GITHUB_CLIENT_ID = os.getenv('GH_CLIENT_ID')
GITHUB_CLIENT_SECRET = os.getenv('GH_CLIENT_SECRET')
GCS_BUCKET_NAME = os.getenv('GCS_BUCKET_NAME', 'your-default-bucket-name')
DATABASE_URL=postgresql+psycopg2://<USER>:<PASSWORD>@/<DB_NAME>?host=/cloudsql/<CONNECTION_NAME>


