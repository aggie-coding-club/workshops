import re

import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import GaussianNB

from resources import training_data

def clean_text(text):
    text = re.sub('[^a-zA-Z]', ' ', text)
    text = text.lower().split()
    ps = PorterStemmer()
    text = [ps.stem(word) for word in text if word not in set(stopwords.words('english'))]
    text = ' '.join(text)
    return text


class QuestionClassifier():
    def __init__(self):
        # Creating the Corpus
        self.corpus = []
        self.ps = PorterStemmer()
        for item in training_data:
            question = clean_text(item[0]) # item[0] is the question
            self.corpus.append(question)

        # Creating the Bag of Words Model
        self.cv = CountVectorizer(max_features = 25)
        X = self.cv.fit_transform(self.corpus).toarray()
        Y = [item[1] for item in training_data] # list of intents

        # Fitting the classifier to the training set
        self.classifier = GaussianNB()
        self.classifier.fit(X, Y)

    def predict(self, question):
        question = clean_text(question)
        corpus = self.corpus
        corpus.append(question)
        X = self.cv.transform(corpus).toarray()
        pred = self.classifier.predict(X[-1].reshape(1, -1))[0]
        return pred


if __name__ == "__main__":
    lol = QuestionClassifier()
    while (True):
        question = input("Question: ")
        intent = lol.predict(question)
        print(f'You\'re asking about {intent}.')
        