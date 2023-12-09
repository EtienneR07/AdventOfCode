from math import lcm


class Solver8():
    def get_map_dictionary(self, lines):
        data_dict = {}

        for line in lines[2:]:
            split_data = line.split('=')
            key = split_data[0].split()[0]
            value = tuple([x.split()[0] for x in split_data[1].replace(')', '').replace(
                '(', '').split(',')])
            data_dict[key] = value
        return data_dict

    def get_starting_keys(self, data_dict):
        keys = [x[0] for x in data_dict.items() if x[0][-1] == 'A']
        return keys

    def get_key_from_instruction(self, current_map, instruction):
        if instruction == 'L':
            return current_map[0]
        return current_map[1]

    def solve_core(self, current_key, data_dict, instruction_line, comparer_func):
        step = 0
        zzz_found = False
        while not zzz_found:
            for instruction in instruction_line:
                step += 1
                current_key = self.get_key_from_instruction(
                    data_dict[current_key], instruction)
                if comparer_func(current_key):
                    zzz_found = True
                    break
        return step

    def solve_a(self, lines):
        data_dict = self.get_map_dictionary(lines)
        current_key = "AAA"
        instruction_line = lines[0].replace('\n', '')
        return self.solve_core(current_key, data_dict, instruction_line, lambda x: x == 'ZZZ')

    def solve_b(self, lines):
        data_dict = self.get_map_dictionary(lines)
        current_keys = self.get_starting_keys(data_dict)
        instruction_line = lines[0].replace('\n', '')

        all_steps = []
        for current_key in current_keys:
            all_steps.append(self.solve_core(
                current_key, data_dict, instruction_line, lambda x: x[-1] == 'Z'))

        print(*all_steps)
        return lcm(*all_steps)
