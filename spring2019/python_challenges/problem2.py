# Problem 2 solution by Edgar Martinez.
#
# If we list all the natural numbers below 10 that are multiples of 3 or 5, we
# get 3, 5, 6, and 9. The sum of these multiples is 23.
#
# Find the sum of all the multiples of 3 or 5 below 1000.

def sum_multiples_of_3_and_5_below(x):
    """Returns the sum of the multiples of 3 and 5 below a given number."""
    current_sum = 0
    for idx in range(3, x):
        if idx % 3 == 0 or idx % 5 == 0:
            current_sum += idx
    return current_sum

if __name__ == "__main__":
    case1 = (sum_multiples_of_3_and_5_below(10) == 23)
    case2 = (sum_multiples_of_3_and_5_below(15) == 45)
    case3 = (sum_multiples_of_3_and_5_below(16) == 60)

    print("CASE 1 --------- {0}".format("PASS" if case1 else "FAIL"))
    print("CASE 2 --------- {0}".format("PASS" if case2 else "FAIL"))
    print("CASE 3 --------- {0}".format("PASS" if case3 else "FAIL"))

    # print(sum_multiples_of_3_and_5_below(1000)) = 233168