
class Solver5():
    def __init__(self):
        self.seeds_mapper = []

    def feed_seeds_a(self, lines):
        self.seeds_mapper = [[int(s)] for s in lines[0].split(':')[1].split()]

    def feed_seeds_b(self, lines):
        numbers = lines[0].split(':')[1].split()
        seed_ranges = [(int(numbers[i]), int(numbers[i + 1]))
                       for i in range(0, len(numbers) - 1, 2)]
        for seed_range in seed_ranges:
            for i in range(seed_range[0], seed_range[0] + seed_range[1]):
                self.seeds_mapper.append([i])

    def in_range(self, number, range):
        return number >= range[0] and number <= range[1]

    def get_ranges(self, line):
        numbers = [int(n) for n in line.split()]
        return (numbers[1], numbers[1] + numbers[2], numbers[0])

    def process_ranges(self, ranges):
        for index, current_level in enumerate(self.seeds_mapper):
            number_to_map = current_level[-1]
            found = False
            for range in ranges:
                if found:
                    break

                if self.in_range(current_level[-1], range):
                    distance = number_to_map - range[0]
                    self.seeds_mapper[index].append(range[2] + distance)
                    found = True

            if not found:
                self.seeds_mapper[index].append(number_to_map)

    def solve_core(self, lines):
        ranges_to_process = []
        for line in lines[1:]:
            if line.strip() == "":
                continue

            if any(char.isalpha() for char in line):
                if any(ranges_to_process):
                    self.process_ranges(ranges_to_process)
                    ranges_to_process = []
                continue

            ranges_to_process.append(self.get_ranges(line))

        if any(ranges_to_process):
            self.process_ranges(ranges_to_process)

        locations = [i[-1] for i in self.seeds_mapper]

        return min(locations)

    def solve_a(self, lines):
        self.feed_seeds_a(lines)
        return self.solve_core(lines)

    def solve_b(self, lines):
        self.feed_seeds_b(lines)
        return 0
