from app import db

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    msg = db.Column(db.String(256), index=True)

    def __repr__(self):
        return self.msg


# class User(db.Model):
#   id = db.Column(db.Integer, primary_key=True)
#   username = db.Column(db.String(64), index=True, unique=True)
#   email = db.Column(db.String(64), index=True, unique=True)

#   def __repr__(self):
#       return self.username