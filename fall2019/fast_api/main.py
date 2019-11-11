from fastapi import FastAPI
from pydantic import BaseModel
import datetime
import json

app = FastAPI()


class Tweet(BaseModel):
    message: str
    owner: str


def jsonify_tweet(tweet: Tweet):
    return {
        "owner": tweet.owner,
        "message": tweet.message
    }


def write_tweet(tweet: Tweet):
    data = {}
    with open("tweets.json", "r") as file:
        data = json.load(file)
    with open("tweets.json", "w") as file:
        data["tweets"].append(jsonify_tweet(tweet))
        json.dump(data, file)

def get_tweets():
    data = {}
    with open("tweets.json", "r") as file:
        data = json.load(file)
    return data


@app.get("/")
def home():
    return {"Hello": "World"}


@app.post("/tweets")
def tweet_send(tweet: Tweet):
    write_tweet(tweet)
    return {"message": "Tweet recieved!"}


@app.get("/tweets")
def tweet_get():
    return get_tweets()
