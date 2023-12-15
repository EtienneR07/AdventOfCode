
class Solver14():
    def solve_a(self, lines):
        result = 0
        map = [[c for c in l.replace('\n', '')] for l in lines]
        rocks = self.get_all_rounded_rock_positions(map)
        for rock in rocks:
            self.try_move_up(rock, map)

        multiplier = len(map)
        for row in map:
            n_rocks = row.count('O')
            result += n_rocks * multiplier
            multiplier -= 1
        return result

    def solve_b(self, lines):
        return 0

    def get_all_rounded_rock_positions(self, map):
        rocks = []
        for y, line in enumerate(map):
            for x, char in enumerate(line):
                if char == 'O':
                    rocks.append((x, y))
        return rocks

    def try_move_up(self, rock, map):
        rock_x = rock[0]
        current_y = rock[1]
        while not (current_y == 0 or map[current_y - 1][rock_x] == '#' or map[current_y - 1][rock_x] == 'O'):
            current_y -= 1

        if current_y != rock[1]:
            map[current_y][rock_x] = 'O'
            map[rock[1]][rock_x] = '.'
