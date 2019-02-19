# Problem 1 solution by Edgar Martinez.
#
# Given a character and a list of strings, return the strings that start with
# that character. If there's no match, return an empty list.
#
# For example, given character 'a' and the list ['apple', 'banana', 'kiwi',
# 'acorn', 'orange'], return ['apple', 'acorn'].

def starts_with(c, arr):
    """Returns the strings in arr that start with the character c."""
    return [word for word in arr if word[0] == c]

if __name__ == "__main__":
    case1 = (['asf','amnc'] == starts_with('a', ['asf','fdf','few','amnc']))
    case2 = (['bcd','bddx'] == starts_with('b', ['bcd','dcd','bddx','dwe']))
    case3 = ([] == starts_with('c', []))

    print("CASE 1 --------- {0}".format("PASS" if case1 else "FAIL"))
    print("CASE 2 --------- {0}".format("PASS" if case2 else "FAIL"))
    print("CASE 3 --------- {0}".format("PASS" if case3 else "FAIL"))