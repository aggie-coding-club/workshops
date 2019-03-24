from flask import render_template
from app import app
from app.forms import ChatForm

@app.route('/')
@app.route('/home')
def index():
    return render_template('home.html')

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    form = ChatForm()
    # Code what happens when user submits
    return render_template('chat.html', form=form)