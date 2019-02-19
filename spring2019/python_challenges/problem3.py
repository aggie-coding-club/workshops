# Problem 3 solution by Edgar Martinez.
#
# Write a BankAccount class that keeps a balance and has a withdraw and deposit
# function. Allow us to specify the initial balance when you make a BankAccount.
# Make the withdraw and deposit functions return the updated balance.

class BankAccount():
    """
    A representation of a bank account you can withdraw from and deposit to.
    """
    def __init__(self, balance):
        """The constructor of our bank account class."""
        self.__balance = balance

    def withdraw(self, amount):
        """
            Withdraws a certain amount > 0 from our bank account. Returns the
            updated balance.
        """
        if (amount > 0):
            self.__balance -= amount
        return self.__balance
    
    def deposit(self, amount):
        """
            Deposits a certain amount > 0 from our bank account. Returns the
            updated balance.
        """
        if (amount > 0):
            self.__balance += amount
        return self.__balance

    def balance(self):
        return self.__balance

if __name__ == "__main__":
    case1 = (500 == BankAccount(1000).withdraw(500))
    case2 = (500 == BankAccount(250).deposit(250))
    case3 = (0 == BankAccount(100).withdraw(100))

    print("CASE 1 --------- {0}".format("PASS" if case1 else "FAIL"))
    print("CASE 2 --------- {0}".format("PASS" if case2 else "FAIL"))
    print("CASE 3 --------- {0}".format("PASS" if case3 else "FAIL"))