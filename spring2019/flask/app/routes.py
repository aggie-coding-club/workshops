from flask import render_template, redirect, url_for
from app import app
from app.forms import ChatForm

@app.route('/')
@app.route('/home')
def index():
    return render_template('home.html')

messages = []

@app.route('/chat', methods=['GET', 'POST'])
def chat():
    form = ChatForm()
    # Code what happens when user submits
    if form.validate_on_submit():
        msg = { 
            'from': 'You', 
            'body': form.message.data,
            'color': 'royalblue'
        }

        messages.append(msg)
        # respond to msg
        res = {
            'from': 'Bot',
            'body': 'What is "{}"?'.format(form.message.data),
            'color': 'grey'
        }
        messages.append(res)
        return redirect(url_for('chat'))

    return render_template('chat.html', form=form, messages=messages)