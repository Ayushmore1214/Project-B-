from apscheduler.schedulers.background import BackgroundScheduler
from app.github_utils import backup_repository
from app.models import User

scheduler = BackgroundScheduler()

def schedule_backup(user_id, repo_name, interval_hours):
    scheduler.add_job(
        backup_repository,
        'interval',
        hours=interval_hours,
        args=[user_id, repo_name]
    )