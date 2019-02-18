"""
    Created by Thomas McDonald
    This is a solution for Problem 5 for the basic Python introduction workshop
    for Aggie Coding Club
"""

import requests

class User():
    """Act as a wrapper for users at JSONPlaceholderAPI"""
    api_loc = 'https://jsonplaceholder.typicode.com/users'

    def __init__(self, id=0, name='default', username='default', email='default@default.com'):
        """Initialize user with basic information"""
        self.id = id
        self.name = name
        self.username = username
        self.email = email

    def __str__(self):
        return 'User Info:\nID: {}\nName: {}\nUsername: {}\nEmail: {}'.format(self.id, self.name, self.username, self.email)

    @staticmethod
    def get_users():
        """Gets users from JSONPlaceholderAPI and converts to a list of User objects"""
        users = []
        response = requests.get(User.api_loc)
        # gets list of users - list of dictionaries
        response_dictionary = response.json()
        for usr_dict in response_dictionary:
            users.append(User(usr_dict['id'], usr_dict['name'], usr_dict['username'], usr_dict['email']))
        return users

    @staticmethod
    def get_user(id=-1, name=None):
        """Get the first user with specified id or specified name"""
        request_str = User.api_loc
        if id >= 0:
            request_str += '?id={}'.format(id)
        elif name != None:
            request_str += '?name={}'.format(name)
        else:
            return None

        response = requests.get(request_str)
        try:
            usr_dict = response.json()[0]
            return User(usr_dict['id'], usr_dict['name'], usr_dict['username'], usr_dict['email'])
        except:
            return None

    @staticmethod
    def add_user(user):
        """Add a user w/o an id"""
        response = requests.post(User.api_loc, data=user.__dict__)
        if response.status_code == 201:
            return response.json()
        else:
            return None

def main():
    new_user = User(1, 'joe', 'joeisbomb', 'joe@gmail.com')

    print('\nAdding user\n---------------------')
    print(User.add_user(new_user))

    print('\nGetting second of all users\n---------------------')
    print(User.get_users()[1])

    print('\nGetting user: Leanne Graham\n---------------------')
    print(User.get_user(name='Leanne Graham')) # Should print all of Leanne's information

if __name__ == "__main__":
    main()