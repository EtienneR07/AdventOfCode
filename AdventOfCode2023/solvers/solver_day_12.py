from itertools import permutations
from itertools import groupby


class Solver12():
    def solve_a(self, lines):
        result = 0
        for line in lines:
            split = line.split()
            criteria = [int(n) for n in split[1].split(',')]
            springs = split[0]
            springs_sum = sum(criteria)
            permutations = self.get_all_permutations(springs, springs_sum)
            for permutation in permutations:
                if self.validate_configuration(permutation, criteria):
                    result += 1

        return result

    def solve_b(self, lines):
        return 0

    def validate_configuration(self, springs, criteria):
        streaks = [len(list(group))
                   for key, group in groupby(springs) if key == '#']
        return streaks == criteria

    def get_all_permutations(self, springs, springs_sum):
        springs_permutations = []
        interrogation_indexes = []
        known_springs_count = 0
        for index, spring in enumerate(springs):
            if spring == '?':
                interrogation_indexes.append(index)
            if spring == '#':
                known_springs_count += 1

        required_fill_count = springs_sum - known_springs_count
        interrogation_count = len(interrogation_indexes)

        all_permutations = permutations(['#'] * required_fill_count + ['.'] *
                                        (interrogation_count - required_fill_count))

        distinct_all_permutations = set(
            map(tuple, [list(perm) for perm in all_permutations]))

        for permu in distinct_all_permutations:
            springs_copy = list(springs)
            for i, char in enumerate(permu):
                springs_copy[interrogation_indexes[i]] = char
            springs_permutations.append(springs_copy)

        return springs_permutations
