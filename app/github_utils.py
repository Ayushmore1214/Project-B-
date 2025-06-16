import requests
import json
from datetime import datetime
from app import db
from app.models import Backup
from app.gcs_utils import upload_to_gcs

def get_user_repos(access_token):
    headers = {'Authorization': f'token {access_token}'}
    repos = []
    url = 'https://api.github.com/user/repos?per_page=100'
    
    while url:
        response = requests.get(url, headers=headers)
        repos.extend(response.json())
        url = response.links.get('next', {}).get('url')
    
    return repos