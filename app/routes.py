from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_required, current_user
from app.github_utils import get_user_repos, backup_repository
from app.models import Backup
from app.forms import BackupScheduleForm

main = Blueprint('main', __name__)

@main.route('/')
def index():
    if current_user.is_authenticated:
        return redirect(url_for('main.dashboard'))
    return render_template('login.html')

@main.route('/dashboard')
@login_required
def dashboard():
    repos = get_user_repos(current_user.access_token)
    return render_template('dashboard.html', repos=repos)