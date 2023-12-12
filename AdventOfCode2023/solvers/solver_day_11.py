
class Solver11():
    def get_galaxy_coordinates(self, universe):
        coordinates = []
        for y, line in enumerate(universe):
            for x, char in enumerate(line):
                if char == '#':
                    coordinates.append((x, y))
        return coordinates

    def get_expanded_universe_coordinates(self, lines):
        lines_clean = [l.replace('\n', '') for l in lines]
        all_star_y_axis_index = []
        for x, char in enumerate(lines_clean[0]):
            if char == '.' and all([l[x] == '.' for l in lines_clean]):
                all_star_y_axis_index.append(x)

        all_star_x_axis_index = []
        for i, line in enumerate(lines_clean):
            for char in line:
                if all(char == '.' for char in line):
                    all_star_x_axis_index.append(i)
        return (set(all_star_y_axis_index), set(all_star_x_axis_index))

    def get_expanded_universe(self, lines):
        lines_clean = [l.replace('\n', '') for l in lines]
        all_star_y_axis_index = []
        for x, char in enumerate(lines_clean[0]):
            if char == '.' and all([l[x] == '.' for l in lines_clean]):
                all_star_y_axis_index.append(x)
        expanded_universe = []
        for line in lines_clean:
            expanded_line = []
            for x, char in enumerate(line):
                if (x in all_star_y_axis_index):
                    expanded_line.append('.')
                expanded_line.append(char)
            expanded_universe.append(expanded_line)
            if all(char == '.' for char in line):
                expanded_universe.append(expanded_line)
        return expanded_universe

    def solve_a(self, lines):
        expanded_universe = self.get_expanded_universe(lines)
        galaxies = self.get_galaxy_coordinates(expanded_universe)

        result = 0
        for i in range(0, len(galaxies)):
            for j in range(i + 1, len(galaxies)):
                galaxy_x = galaxies[i][0]
                galaxy_y = galaxies[i][1]
                compared_x = galaxies[j][0]
                compared_y = galaxies[j][1]
                y = compared_y - galaxy_y
                if compared_x > galaxy_x:
                    x = compared_x - galaxy_x
                else:
                    x = galaxy_x - compared_x
                result += x + y

        return result

    def solve_b(self, lines):
        millions_coordinates = self.get_expanded_universe_coordinates(lines)
        x_index_millions = millions_coordinates[0]
        y_index_millions = millions_coordinates[1]
        galaxies = self.get_galaxy_coordinates(lines)
        result = 0
        for i in range(0, len(galaxies)):
            for j in range(i + 1, len(galaxies)):
                galaxy_x = galaxies[i][0]
                galaxy_y = galaxies[i][1]
                compared_x = galaxies[j][0]
                compared_y = galaxies[j][1]

                y_millions_to_add = len(
                    [y for y in y_index_millions if galaxy_y < y < compared_y]) * 999999

                y = compared_y + y_millions_to_add - galaxy_y
                if compared_x > galaxy_x:
                    x_millions_to_add = len(
                        [x for x in x_index_millions if galaxy_x < x < compared_x]) * 999999
                    x = compared_x + x_millions_to_add - galaxy_x
                else:
                    x_millions_to_add = len(
                        [x for x in x_index_millions if compared_x < x < galaxy_x]) * 999999
                    x = galaxy_x + x_millions_to_add - compared_x
                result += x + y

        return result
