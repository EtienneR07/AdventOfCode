class Solver0():
    def solve_a(self, file):
        result = 0
        lines = file.readlines()
        for line in lines:
            result = result + int(line)
        return result

    def solve_b(self, file):
        result = 1
        lines = file.readlines()
        for line in lines:
            result = result * int(line)
        return result
