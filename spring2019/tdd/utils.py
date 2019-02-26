import random
from typing import Generator


class NegativeIntegerException(Exception):
    pass


def fibonacci_sequence(x: int) -> Generator[int]:
    """Generator for Fibonacci sequence.

    Args:
        x (int): Number of elems to generate
    """
    if type(x) != int:
        raise ValueError("That's not an integer!")
    if x < 0:
        raise NegativeIntegerException("It's less than 0!")
    a, b = 0, 1
    for _ in range(x):
        yield a
        a, b = b, a + b


def random_number(lower_bound: int, upper_bound: int) -> int:
    """
    Generates a random number between lower_bound and upper_bound.

    Args:
        lower_bound (int): The lower bound of the range
        upper_bound (int): The upper bound of the range
    """
    if type(lower_bound) is not int:
        raise ValueError("Lower bound must be an integer")
    if type(upper_bound) is not int:
        raise ValueError("Upper bound must be an integer")
    if lower_bound > upper_bound:
        lower_bound, upper_bound = upper_bound, lower_bound
    return random.choice(list(range(lower_bound, upper_bound)))
