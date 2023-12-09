class Solver5():
    def feed_seeds(self, lines):
        return [[int(s)] for s in lines[0].split(':')[1].split()]

    def feed_seed_ranges(self, lines):
        numbers = lines[0].split(':')[1].split()
        return [([range(int(numbers[i]), int(numbers[i]) + int(numbers[i + 1]))])
                for i in range(0, len(numbers) - 1, 2)]

    def in_range(self, number, range):
        return number >= range[0] and number <= range[1]

    def get_ranges(self, line):
        numbers = [int(n) for n in line.split()]
        return (numbers[1], numbers[1] + numbers[2], numbers[0])

    def get_real_ranges(self, line):
        numbers = [int(n) for n in line.split()]
        return (range(numbers[1], numbers[1] + numbers[2]), numbers[0])

    def process_ranges(self, ranges, seed_mapper):
        for index, current_level in enumerate(seed_mapper):
            number_to_map = current_level[-1]
            found = False
            for range in ranges:
                if found:
                    break

                if self.in_range(current_level[-1], range):
                    distance = number_to_map - range[0]
                    seed_mapper[index].append(range[2] + distance)
                    found = True

            if not found:
                seed_mapper[index].append(number_to_map)

    def solve_a(self, lines):
        seed_mapper = self.feed_seeds(lines)
        ranges_to_process = []
        for line in lines[1:]:
            if line.strip() == "":
                continue

            if any(char.isalpha() for char in line):
                if any(ranges_to_process):
                    self.process_ranges(ranges_to_process, seed_mapper)
                    ranges_to_process = []
                continue

            ranges_to_process.append(self.get_ranges(line))

        if any(ranges_to_process):
            self.process_ranges(ranges_to_process, seed_mapper)

        locations = [i[-1] for i in seed_mapper]

        return min(locations)

    def solve_b(self, lines):
        seed_ranges = self.feed_seed_ranges(lines)
        ranges_to_process = []
        for line in lines[1:]:
            if line.strip() == "":
                continue

            if any(char.isalpha() for char in line):
                if any(ranges_to_process):
                    self.process_b(ranges_to_process, seed_ranges)
                    ranges_to_process = []
                continue

            ranges_to_process.append(self.get_real_ranges(line))

            if any(ranges_to_process):
                self.process_b(ranges_to_process, seed_ranges)

        return 0

    def process_b(self, ranges_to_process, seed_ranges):
        for seed_range in seed_ranges:
            for to_process in ranges_to_process:
                for current_seed_range in seed_range:
                    current_seed_range_set = set(current_seed_range)
                    to_process_set = set(to_process[0])
                    intersection_set = current_seed_range_set.intersection(
                        to_process_set)
                    print(intersection_set)

        return 0
