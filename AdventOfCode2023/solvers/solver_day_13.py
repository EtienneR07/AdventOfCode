
class Solver13():
    def solve_a(self, lines):
        groups = [g.split('\n') for g in ''.join(lines).split('\n\n')]
        result = 0
        for group in groups:
            result += self.check_group(group)
        return result

    def solve_b(self, lines):
        groups = [g.split('\n') for g in ''.join(lines).split('\n\n')]
        result = 0
        for group in groups:
            result += self.check_group(group, True)
        return result

    def check_group(self, group, check_for_smudge=False):
        score = self.check_for_reflexion(group, check_for_smudge) * 100
        if score == 0:
            rotated_group = self.rotate_strings(group)
            score = self.check_for_reflexion(rotated_group, check_for_smudge)

        return score

    def rotate_strings(self, group):
        rotated_group = list(map(''.join, zip(*group)))
        print(rotated_group)

        return rotated_group

    def check_for_reflexion(self, group, check_for_smudge=False):
        for mirror in range(1, len(group)):
            failed = False
            it_t = mirror - 1
            it_b = mirror
            used_smudge = False
            while it_t >= 0 and it_b < len(group):
                if group[it_t] == group[it_b]:
                    it_t -= 1
                    it_b += 1
                elif used_smudge == False and check_for_smudge and self.differ_by_only_one_char(group[it_t], group[it_b]):
                    it_t -= 1
                    it_b += 1
                    used_smudge = True
                else:
                    failed = True
                    break
            if not failed:
                return mirror
        return 0

    def differ_by_only_one_char(self, str1, str2):
        zipped = sum(1 for c1, c2 in zip(str1, str2) if c1 != c2)
        return zipped == 1
