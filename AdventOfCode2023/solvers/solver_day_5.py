class Solver5():
    def feed_seeds(self, lines):
        return [[int(s)] for s in lines[0].split(':')[1].split()]

    def feed_seed_ranges(self, lines):
        numbers = lines[0].split(':')[1].split()
        return [([(int(numbers[i]), int(numbers[i]) + int(numbers[i + 1]))])
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
        seed_ranges_list = self.feed_seed_ranges(lines)
        maps = [[item for item in map.split('\n') if all(
            not c.isalpha() and c for c in item) and len(item) != 0] for map in ''.join(lines[1:]).split('\n\n')]
        mappings = [[(int(second), int(second) + int(third), int(first), int(first) + int(third))
                     for first, second, third in (l.split(' ', 2) for l in i)]for i in maps]
        final_seed_maps = []
        for seeds in seed_ranges_list:
            mapped_seeds = seeds
            for mapping in mappings:
                mapped_seeds = self.iterate_maps(mapped_seeds, mapping)
                print(mapped_seeds)
            final_seed_maps.append(mapped_seeds)

        test = min(pair[0] for map in final_seed_maps for pair in map)
        return test

    def iterate_maps(self, seeds, maps):
        current_seeds = seeds
        mapped = []
        for map in maps:
            mapped_seeds, remains = self.map_seeds(current_seeds, map)
            current_seeds = remains
            if len(mapped_seeds) != 0:
                mapped.extend(mapped_seeds)

        if len(current_seeds) != 0:
            mapped.extend(current_seeds)

        return mapped

    def map_seeds(self, seeds, map):
        mapped = []
        total_remains = []
        for seed_range in seeds:
            intersected_range, remains = self.intersect_and_get_remains(
                seed_range, (map[0], map[1]))
            total_remains.extend(remains)

            if intersected_range != None:
                diff = map[2] - map[0]
                mapped.append((diff + intersected_range[0],
                               diff + intersected_range[1]))
        return mapped, total_remains

    def intersect_and_get_remains(self, range_a, range_b):
        if range_a[1] <= range_a[0] or range_b[1] <= range_b[0]:
            raise ValueError("Invalid range specified for intersection")

        intersection_start = max(range_a[0], range_b[0])
        intersection_end = min(range_a[1], range_b[1])

        if intersection_start >= intersection_end:
            return None, [range_a]

        remaining = []

        if range_a[0] < range_b[0]:
            remaining.append((range_a[0], intersection_start))

        if range_a[1] > range_b[1]:
            remaining.append((intersection_end, range_a[1]))

        return (intersection_start, intersection_end), remaining
