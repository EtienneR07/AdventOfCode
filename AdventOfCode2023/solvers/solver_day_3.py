import re
import numpy as np


class Solver3():
    def __init__(self):
        self.star_pattern = '(\\*)'
        self.digit_pattern = '(\\d+)'
        self.symbol_pattern = '[\!\@\#\$\%\^&\*\-\=\+\/]'
        self.symbols = ['!', '@', '#', '$', '%',
                        '^', '&', '*', '-', '=', '+', '/']

    def intersects(self, range1, range2):
        start1, end1 = range1
        start2, end2 = range2
        return (start1 <= end2 and end1 >= start2)

    def extract_matches(self, line, pattern, star_index_range):
        matches = [match for match in self.get_match_tuple(
            line, pattern) if self.intersects(star_index_range, (match[0], match[1]))]
        return matches

    def previous_line(self, lines, index):
        return lines[index - 1] if index > 0 else None

    def next_line(self, lines, index):
        return lines[index + 1] if index + 1 < len(lines) else None

    def get_match_tuple(self, current_line, pattern):
        return [(match.start(0), match.end(0) - 1, match.group())
                for match in re.finditer(pattern, current_line)]

    def is_symbol_adjacent(self, number_tuple, current_line, previous_line, next_line):
        if number_tuple[0] != 0 and current_line[number_tuple[0] - 1] in self.symbols:
            return True

        if number_tuple[1] != len(current_line) - 1 and current_line[number_tuple[1] + 1] in self.symbols:
            return True

        start = number_tuple[0] - 1 if number_tuple[0] > 0 else 0
        end = number_tuple[1] + \
            1 if number_tuple[1] < len(current_line) else number_tuple[1]

        if previous_line is not None and bool(re.search(self.symbol_pattern, previous_line[start: end + 1])):
            return True

        if next_line is not None and bool(re.search(self.symbol_pattern, next_line[start: end + 1])):
            return True

        return False

    def get_gear_ratio(self, star_tuple, current_line, previous_line, next_line):
        matched_values = []
        star_index_range = (star_tuple[0] - 1 if star_tuple[0] > 0 else 0,
                            star_tuple[0] + 1 if star_tuple[0] < len(current_line) else star_tuple[0])

        current_line_matches = self.extract_matches(
            current_line, self.digit_pattern, star_index_range)
        if any(current_line_matches):
            matched_values.extend([int(m[2]) for m in current_line_matches])

        if previous_line is not None:
            previous_line_matches = self.extract_matches(
                previous_line, self.digit_pattern, star_index_range)
            if any(previous_line_matches):
                matched_values.extend([int(m[2])
                                      for m in previous_line_matches])

        if next_line is not None:
            next_line_matches = self.extract_matches(
                next_line, self.digit_pattern, star_index_range)
            if any(next_line_matches):
                matched_values.extend([int(m[2])
                                      for m in next_line_matches])

        print(matched_values)
        return np.prod(matched_values) if len(matched_values) == 2 else 0

    def solve_a(self, lines):
        result = 0
        for index, current_line in enumerate(lines):
            previous_line = self.previous_line(lines, index)
            next_line = self.next_line(lines, index)
            numbers_in_line = self.get_match_tuple(
                current_line, self.digit_pattern)
            for number_tuple in numbers_in_line:
                if self.is_symbol_adjacent(number_tuple, current_line, previous_line, next_line):
                    result += int(number_tuple[2])

        return result

    def solve_b(self, lines):
        result = 0
        for index, current_line in enumerate(lines):
            previous_line = self.previous_line(lines, index)
            next_line = self.next_line(lines, index)
            stars_in_line = self.get_match_tuple(
                current_line, self.star_pattern)
            for star_tuple in stars_in_line:
                result += self.get_gear_ratio(star_tuple,
                                              current_line, previous_line, next_line)

        return result
