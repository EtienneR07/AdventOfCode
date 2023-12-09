
class Solver9():
    def solve_core(self, lines, steps_lambda):
        result = 0
        for line in lines:
            steps_levels = [[int(n) for n in line.split()]]

            all_zero_steps = False
            while not all_zero_steps:
                previous = None
                new_level = []
                for number in steps_levels[-1]:
                    if previous != None:
                        new_level.append(number - previous)
                    previous = number

                if len(new_level) > 0 and all(n == 0 for n in new_level):
                    all_zero_steps = True
                steps_levels.append(new_level)

            current_step = 0
            for level in reversed(steps_levels[:-1]):
                current_step = steps_lambda(level, current_step)

            result += current_step
        return result

    def solve_a(self, lines):
        return self.solve_core(lines, lambda x, y: x[-1] + y)

    def solve_b(self, lines):
        return self.solve_core(lines, lambda x, y: x[0] - y)
