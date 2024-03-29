import sys


class Coordinates:
    def __init__(self, coordinate_x, coordinate_y, character):
        self.coordinate_y = coordinate_y
        self.coordinate_x = coordinate_x
        self.coordinates = (coordinate_x, coordinate_y)
        self.character = character


class Landscape:
    def __init__(self, lines):
        self.landscape = [[c for c in l.replace('\n', '')] for l in lines]
        self.x_length = len(self.landscape[0])
        self.y_length = len(lines)

        self.go_down = (0, 1)
        self.go_up = (0, -1)
        self.go_right = (1, 0)
        self.go_left = (-1, 0)

        self.permissible_characters = {
            self.go_down: ['|', 'J', 'L', 'S'],
            self.go_up: ['|', '7', 'F', 'S'],
            self.go_right: ['-', 'J', '7', 'S'],
            self.go_left: ['-', 'L', 'F', 'S'],
        }
        self.permissible_directions = {
            '|': [self.go_down, self.go_up],
            '-': [self.go_left, self.go_right],
            'L': [self.go_right, self.go_up],
            'J': [self.go_left, self.go_up],
            '7': [self.go_down, self.go_left],
            'F': [self.go_down, self.go_right],
            'S': [self.go_down, self.go_up, self.go_right, self.go_left]}

    def get_possible_directions(self, previous_coord, current_coord):
        directions = []
        forbidden_direction = (-current_coord.coordinate_x + previous_coord.coordinate_x,
                               -current_coord.coordinate_y + previous_coord.coordinate_y)

        def check_and_append(direction_to_check, lambda_bound_check):
            if lambda_bound_check(self.x_length, self.y_length, current_coord.coordinate_x, current_coord.coordinate_y) \
                    and direction_to_check != forbidden_direction \
                    and direction_to_check in self.permissible_directions[current_coord.character] \
                    and self.is_next_postition_valid(current_coord, direction_to_check):
                directions.append(direction_to_check)

        check_and_append(self.go_up, lambda xl, yl, x, y: y > 0)
        check_and_append(self.go_left, lambda xl, yl, x, y: x > 0)
        check_and_append(self.go_right, lambda xl, yl, x, y: x < xl - 1)
        check_and_append(self.go_down, lambda xl, yl, x, y: y < yl - 1)

        return directions

    def is_next_postition_valid(self, coordinates, direction):
        char = self.landscape[coordinates.coordinate_y +
                              direction[1]][coordinates.coordinate_x + direction[0]]
        if char in self.permissible_characters[direction]:
            return True
        return False

    def find_animal_coordinates(self):
        for y, line in enumerate(self.landscape):
            for x, char in enumerate(line):
                if char == 'S':
                    return Coordinates(x, y, 'S')

    def get_steps_from_farthest_point(self):
        current_coordinates = self.find_animal_coordinates()
        animal = current_coordinates
        visited = self.recursion(
            current_coordinates, current_coordinates)

        return len(visited) // 2, visited

    def recursion(self, last_coordinates, current_coordinates):
        visited = []
        for direction in self.get_possible_directions(last_coordinates, current_coordinates):
            new_x = current_coordinates.coordinate_x + direction[0]
            new_y = current_coordinates.coordinate_y + direction[1]
            new_coord = Coordinates(new_x, new_y, self.landscape[new_y][new_x])

            visited.append((new_coord.coordinates, new_coord.character))

            if new_coord.character == 'S':
                return visited

            next_visited = self.recursion(
                current_coordinates, new_coord)

            if any(next_visited):
                visited.extend(next_visited)
                return visited

        return []


class Solver10():
    def solve_a(self, lines):
        sys.setrecursionlimit(100000)
        landscape = Landscape(lines)
        return landscape.get_steps_from_farthest_point()

    def solve_b(self, lines):
        lines = [line.replace('\n', '') for line in lines]
        sys.setrecursionlimit(100000)
        landscape = Landscape(lines)
        lines = [line.replace('S', 'L') for line in lines]
        _, visited = landscape.get_steps_from_farthest_point()
        visited_set = set([t[0] for t in visited])
        total = 0

        for y, line in enumerate(lines):
            for x, c in enumerate(line):
                border_count = 0
                if (x, y) in visited_set:
                    continue

                for index in range(x, len(line)):
                    if (index, y) in visited_set:
                        if line[index] == '|' or line[index] == 'L' or line[index] == 'F':
                            border_count += 1
                            continue

                        if line[index] == '7' or line[index] == 'J':
                            border_count += 1
                            continue

                if border_count % 2 == 1:
                    print(f"({x}, {y}) is inside")
                    total += 1
        return total
