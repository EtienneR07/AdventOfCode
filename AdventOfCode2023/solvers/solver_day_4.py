class Solver4():

    def split_line(self, line):
        data = line.split(':')[1]
        split = data.split('|')
        return split

    def get_data_scratchcards(self, line):
        split = self.split_line(line)
        return split[1].split()

    def get_data_winner(self, line):
        split = self.split_line(line)
        return set(split[0].split())

    def solve_a(self, lines):
        result = 0
        winners_count = 0
        for line in lines:
            winners_count = 0
            winners = self.get_data_winner(line)
            scratch_numbers = self.get_data_scratchcards(line)
            for scratch_number in scratch_numbers:
                if scratch_number in winners:
                    winners_count += 1

            result += pow(2, winners_count - 1) if winners_count > 0 else 0

        return result

    def solve_b(self, lines):
        result = 0
        copies = []
        for line in lines:
            winners = self.get_data_winner(line)
            scratch_numbers = self.get_data_scratchcards(line)

            scratch_winners = 0
            copies_to_consider = 1

            if any(copies):
                copies_to_consider += copies.pop(0)

            for scratch_number in scratch_numbers:
                if scratch_number in winners:
                    scratch_winners += 1

            for i in range(scratch_winners):
                if i < len(copies):
                    copies[i] += copies_to_consider
                    continue

                copies.append(copies_to_consider)

            result += (copies_to_consider)

        return result
