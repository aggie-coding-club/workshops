from flask import render_template, redirect, url_for
from app import app, db
from app.faq import QuestionClassifier
from app.forms import ChatForm
from app.models import Question
from app.resources import intent

classifier = QuestionClassifier()


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

        # add message to database
        question = Question(msg=msg['body'])
        db.session.add(question)
        db.session.commit()
        
        # respond to the message
        category = classifier.predict(form.message.data)

        bot_response = intent[category]['reply'] + \
            "\n If this does not answer your question, contact " + \
            intent[category]['contact'] + " on Slack."

        res = {
            'from': 'Bot',
            'body': bot_response,
            'color': 'grey'
        }
        messages.append(res)
        return redirect(url_for('chat'))

    return render_template('chat.html', form=form, messages=messages)
