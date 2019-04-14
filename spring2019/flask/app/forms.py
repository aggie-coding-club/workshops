from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ChatForm(FlaskForm):
    """This is the chatbot's chatbox."""
    message = StringField('Your message', validators=[
                          DataRequired()], render_kw={'autofocus': True})
