import re


class Solver1():
    def __init__(self):
        self.string_numbers_dict = {"one": 1, "two": 2, "three": 3,
                                    "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9}

    def solve_a(self, file):
        result = 0
        lines = file.readlines()
        for line in lines:
            matches = re.findall(r"\d", line)
            first = matches[0]
            last = matches[-1]
            result += int(f"{first}{last}")
        return result

    def solve_b(self, file):
        result = 0
        lines = file.readlines()
        for line in lines:
            word_list = '|'.join(self.string_numbers_dict.keys())
            regex = r'(?=(\d|{0}))'
            matches = re.findall(regex.format(word_list), line)
            first = self.string_numbers_dict.get(matches[0], matches[0])
            last = self.string_numbers_dict.get(matches[-1], matches[-1])
            result += int(f"{first}{last}")
        return result
