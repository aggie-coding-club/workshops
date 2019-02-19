# Problem 4 solution by Edgar Martinez
#
# Write a Bank class that keeps a record of users and their BankAccounts. Make
# functions that allow you to withdraw or deposit from a users' bank account.
from problem3 import BankAccount

class Bank():
    """A collection of users and their BankAccounts."""
    def __init__(self):
        """Initialization of our Bank."""
        self.__accounts = {}

    def add_account(self, username, balance):
        """Adds a new user with a BankAccount to our bank's records."""
        if username not in self.__accounts:
            self.__accounts[username] = BankAccount(balance)

    def withdraw(self, username, amount):
        """Given a username and amount, withdraws from that user's account."""
        if username in self.__accounts:
            self.__accounts[username].withdraw(amount)

    def deposit(self, username, amount):
        """Given a username and amont, deposits to that user's account."""
        if username in self.__accounts:
            self.__accounts[username].deposit(amount)

    def __str__(self):
        msg = ""
        for user, account in self.__accounts.items():
            msg += "User: " + user + " Bal: " + str(account.balance()) + "\n"
        return msg

if __name__ == "__main__":
    bank = Bank()
    bank.add_account("u1", 100)
    bank.add_account("u1", 500)
    print(bank)