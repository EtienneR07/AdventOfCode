import copy


class Solver5():
    def feed_seeds(self, lines):
        return [[int(s)] for s in lines[0].split(':')[1].split()]

    def merge_ranges(self, ranges):
        if not ranges:
            return []

        if len(ranges) == 1:
            return ranges

        sorted_ranges = sorted(ranges, key=lambda x: x[0])

        merged_ranges = [sorted_ranges[0]]

        for current_start, current_end in sorted_ranges[1:]:
            previous_start, previous_end = merged_ranges[-1]

        if current_start <= previous_end:
            merged_ranges[-1] = (previous_start,
                                 max(current_end, previous_end))
        else:
            merged_ranges.append((current_start, current_end))

        return merged_ranges

    def feed_seed_ranges(self, lines):
        numbers = lines[0].split(':')[1].split()
        seed_ranges = [(int(numbers[i]), int(numbers[i]) + int(numbers[i + 1]))
                       for i in range(0, len(numbers) - 1, 2)]
        sedd_ranges = []
        for seed_range in seed_ranges:
            sedd_ranges.append([[seed_range]])
        return sedd_ranges

    def in_range(self, number, range):
        return number >= range[0] and number <= range[1]

    def get_ranges(self, line):
        numbers = [int(n) for n in line.split()]
        return (numbers[1], numbers[1] + numbers[2], numbers[0])

    def get_intersection(self, rangeA, rangeB):
        start_intersection = max(rangeA[0], rangeB[0])
        end_intersection = min(rangeA[1], rangeB[1])
        if start_intersection <= end_intersection:
            return (start_intersection, end_intersection)
        else:
            return None

    def retract_intersection(self, rangeA, range_to_retract):
        intersection = self.get_intersection(rangeA, range_to_retract)
        if intersection is None:
            return [rangeA]

        startA, endA = rangeA
        startIntersection, endIntersection = intersection

        if startA < startIntersection and endIntersection < endA:
            return [(startA, startIntersection - 1), (endIntersection + 1, endA)]
        else:
            return [(startA, intersection[0] - 1)] if (intersection[0] < endA and intersection[0] > startA) else [(intersection[1] + 1, endA)]

    def process(self, ranges, mapper):
        if all(isinstance(sublist, list) and all(isinstance(item, int) for item in sublist) for sublist in mapper):
            self.process_ranges_for_seeds(ranges, mapper)
            return
        self.process_ranges_for_seed_ranges(ranges, mapper)

    def process_ranges_for_seeds(self, ranges, seeds_mapper):
        for index, current_level in enumerate(seeds_mapper):
            number_to_map = current_level[-1]
            found = False
            for range in ranges:
                if found:
                    break

                if self.in_range(current_level[-1], range):
                    distance = number_to_map - range[0]
                    seeds_mapper[index].append(range[2] + distance)
                    found = True

            if not found:
                seeds_mapper[index].append(number_to_map)

    def process_ranges_for_seed_ranges(self, ranges, seed_ranges_mapper):
        for index, current_level in enumerate(seed_ranges_mapper):
            ranges_to_map = current_level[-1]
            new_ranges = []
            print(seed_ranges_mapper[index])
            ranges_copy = copy.deepcopy(ranges_to_map)
            for range in ranges:
                for to_map in ranges_to_map:
                    intersection = self.get_intersection(
                        (range[0], range[1]), to_map)

                    if intersection is None:
                        continue

                    if to_map in ranges_copy:
                        if intersection == to_map:
                            ranges_copy.remove(to_map)
                        else:
                            index_of_item = ranges_copy.index(to_map)
                            retracted = self.retract_intersection(
                                to_map,
                                intersection)
                            if len(retracted) == 1:
                                ranges_copy[index_of_item] = retracted[0]
                            else:
                                ranges_copy.remove(to_map)
                                ranges_copy.extend(retracted)

                    distanceStart = intersection[0] - range[0]
                    distanceEnd = intersection[1] - range[0]
                    mapped_intersection = (
                        range[2] + distanceStart, range[2] + distanceEnd)
                    new_ranges.append(mapped_intersection)

            if any(ranges_copy):
                new_ranges.extend(ranges_copy)

            if any(new_ranges):
                new_ranges = self.merge_ranges(new_ranges)
                seed_ranges_mapper[index].append(new_ranges)

    def solve_core(self, lines, mapping):
        ranges_to_process = []
        for line in lines[1:]:
            if line.strip() == "":
                continue

            if any(char.isalpha() for char in line):
                if any(ranges_to_process):
                    self.process(ranges_to_process, mapping)
                    ranges_to_process = []
                continue

            ranges_to_process.append(self.get_ranges(line))

        if any(ranges_to_process):
            self.process(ranges_to_process, mapping)

        locations = [i[-1] for i in mapping]

        if all(isinstance(sublist, list) and all(isinstance(item, int) for item in sublist) for sublist in mapping):
            return min(locations)

        print(mapping)

    def solve_a(self, lines):
        seeds_mapper = self.feed_seeds(lines)
        return self.solve_core(lines, seeds_mapper)

    def solve_b(self, lines):
        seed_ranges_mapper = self.feed_seed_ranges(lines)
        return self.solve_core(lines, seed_ranges_mapper)
