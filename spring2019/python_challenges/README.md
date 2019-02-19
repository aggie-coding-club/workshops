# Python Crash Course
This is a quick set of exercises that will get you started in python. Some of
these problems are simple, but others will challenge even those who consider
themselves proficient.

## I've never used python.
### Problem 1
Write a function that given a list of strings and a character, returns the strings that start with the given character.

For example, given the list ['apple', 'banana', 'kiwi', 'mango', 'acorn', 'orange'] and character 'a', you should return ['apple', 'acorn'].

### Problem 2
If we list the the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

Find the sum of all the multiples of 3 or 5 below 1000.

## I think I know python.
### Problem 3
Write a BankAccount class that keeps a balance and has a withdraw and deposit function. Allow the initial balance to be defined the moment you create the object. Make the withdraw and deposit functions return the updated balance.

### Problem 4
Write a Bank class that keeps a record of users and their BankAccounts. Make a function that allows opening a new BankAccount given a new username and initial balance. Make withdraw and deposit functions that take in a username and amount and update that user’s balance.

## I know python like Kanye knows Kanye.
Write a User class that acts as an interface for getting/adding users from/to https://jsonplaceholder.typicode.com. This class should also allow you to get information for a specific user given a name, id, or another attribute that you want to be able to get a user by. You should also be able to add a User given a User object.  
>I would recommend using the [requests](http://docs.python-requests.org/en/master/user/quickstart/) package: `pip install requests`
