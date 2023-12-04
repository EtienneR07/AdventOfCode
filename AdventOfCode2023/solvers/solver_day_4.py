
class Solver4():
    def solve_a(self, lines):
        result = 0
        winners_count = 0
        for line in lines:
            winners_count = 0
            data = line.split(':')[1]
            split = data.split('|')
            winners = set(split[0].split())
            cards = split[1].split()
            for card in cards:
                if card in winners:
                    winners_count = winners_count + 1
            
            result += pow(2, winners_count - 1) if winners_count > 0 else 0

        return result

    def solve_b(self, lines):
        return 0