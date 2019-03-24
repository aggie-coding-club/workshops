import os

# This will look for a SECRET_KEY environment variable. If it doesn't find it,
# it will return the hardcoded key: 'this is a top secret key!'
class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'this is a top secret key!'