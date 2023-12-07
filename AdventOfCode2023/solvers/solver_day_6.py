class Solver6():
    def solve_a(self, lines):
        t = lines[0].split(':')[1].split()
        d = lines[1].split(':')[1].split()
        r = 1
        for i in range(len(t)):
            n = 0
            for j in range(1, int(t[i]) - 1):
                if j * (int(t[i]) - j) > int(d[i]):
                    n += 1
            r *= n

        return r

    def solve_b(self, lines):
        return self.solve_a(lines)
