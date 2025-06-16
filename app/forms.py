from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class BackupScheduleForm(FlaskForm):
    repo_name = StringField('Repository', validators=[DataRequired()])
    interval_hours = IntegerField('Interval (hours)', validators=[DataRequired()])
    submit = SubmitField('Schedule Backup')