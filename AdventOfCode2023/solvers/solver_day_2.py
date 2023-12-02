import re


class Solver2():
    def __init__(self):
        self.inquiry = {"red": 12, "green": 13, "blue": 14}

    def get_cube_count(self, cube):
        split = cube.split()
        return int(split[0])

    def get_cube_color(self, cube):
        split = cube.split()
        return split[1]

    def get_cube_draws(self, line):
        data = line.split(':')[1]
        cube_draws = re.split(',|;', data)
        return cube_draws

    def solve_a(self, lines):
        result = 0
        for index, value in enumerate(lines):
            impossible = False
            currentLine = index + 1
            cube_draws = self.get_cube_draws(value)
            for cub_draw in cube_draws:
                if self.get_cube_count(cub_draw) > self.inquiry.get(self.get_cube_color(cub_draw)):
                    impossible = True
                    break

            if not impossible:
                result += currentLine

        return result

    def solve_b(self, lines):
        result = 0
        for line in lines:
            score = 1
            color_dict = {"red": 0, "green": 0, "blue": 0}
            cube_draws = self.get_cube_draws(line)
            for cub_draw in cube_draws:
                count = self.get_cube_count(cub_draw)
                color = self.get_cube_color(cub_draw)
                if color_dict.get(color) < count:
                    color_dict[color] = count

            result += (color_dict["red"] *
                       color_dict["green"] * color_dict["blue"])
        return result
