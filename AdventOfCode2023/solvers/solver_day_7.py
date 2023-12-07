class Solver7():
    def __init__(self):
        self.type_prio_dict = {"five_of_a_kind": 7,
                               "four_of_a_kind": 6,
                               "full_house": 5,
                               "three_of_a_kind": 4,
                               "two_pairs": 3,
                               "one_pair": 2,
                               "high_card": 1}
        self.card_prio_dict = {"A": 13, "K": 12, "Q": 11, "J": 10, "T": 9, "9": 8, "8": 7, "7": 6, "6": 5, "5": 4,
                               "4": 3, "3": 2, "2": 1, }

    def get_hand_count(self, hand, count_check):
        for _, c1 in enumerate(hand):
            count = 0
            for _, c2 in enumerate(hand):
                if c1 == c2:
                    count += 1
            if count == count_check:
                return True
        return False

    def upgrade_cards(self, hand):
        if hand.count('J') == 5:
            return hand

        unique_chars = set(hand)
        counted = []
        for unique in unique_chars:
            if unique == 'J':
                continue
            counted.append((unique, hand.count(unique)))

        card_with_highest_count = max(counted, key=lambda x: x[1])[0]
        return hand.replace('J', card_with_highest_count)

    def get_hand_type(self, hand, check_jokers):
        if check_jokers:
            hand = self.upgrade_cards(hand)

        hand_set_length = len(set(hand))
        if hand_set_length == 5:
            return self.type_prio_dict["high_card"]

        if hand_set_length == 1:
            return self.type_prio_dict["five_of_a_kind"]

        if hand_set_length == 2:
            if self.get_hand_count(hand, 4):
                return self.type_prio_dict["four_of_a_kind"]
            return self.type_prio_dict["full_house"]

        if hand_set_length == 3:
            if self.get_hand_count(hand, 3):
                return self.type_prio_dict["three_of_a_kind"]
            return self.type_prio_dict["two_pairs"]

        return self.type_prio_dict["one_pair"]

    def solve_a(self, lines, check_jokers=False):
        typed_list = []
        for line in lines:
            hand = line.split()[0]
            bid = line.split()[1]
            typed_list.append((
                hand,
                self.get_hand_type(hand, check_jokers),
                self.card_prio_dict[hand[0]],
                self.card_prio_dict[hand[1]],
                self.card_prio_dict[hand[2]],
                self.card_prio_dict[hand[3]],
                self.card_prio_dict[hand[4]],
                int(bid)))

        sorted_cards = sorted(typed_list, key=lambda x: (
            x[1], x[2], x[3], x[4], x[5], x[6]))

        result = 0
        for i, sorted_card in enumerate(sorted_cards):
            result += sorted_card[7] * (i + 1)

        return result

    def solve_b(self, lines):
        self.card_prio_dict["J"] = 0
        result = self.solve_a(lines, True)
        return result
