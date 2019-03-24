from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

# This form is used to get input from the user in the chatbot's page.
class ChatForm(FlaskForm):
    message = StringField('Your message', validators=[DataRequired()])