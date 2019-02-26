import unittest

import utils


class FibonacciTestCase(unittest.TestCase):
    def test_x_is_int(self):
        with self.assertRaises(ValueError):
            list(utils.fibonacci_sequence("dummy"))

    def test_x_is_positive(self):
        with self.assertRaises(utils.NegativeIntegerException):
            list(utils.fibonacci_sequence(-1))


class RandomNumberTestCase(unittest.TestCase):
    def test_in_range(self):
        random_val = utils.random_number(0, 2)
        self.assertTrue(0 <= random_val and random_val < 2)

    def test_upper_smaller_correction(self):
        wrong_upper_bound = 0
        wrong_lower_bound = 2
        random_val = utils.random_number(wrong_upper_bound, wrong_lower_bound)
        self.assertTrue(0 <= random_val and random_val < 2)
