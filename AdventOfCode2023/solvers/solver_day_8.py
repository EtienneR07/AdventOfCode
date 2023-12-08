
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

    def solve_a(self, lines):
        data_dict = self.get_map_dictionary(lines)
        current_key = "AAA"
        instruction_line = lines[0].replace('\n', '')
        zzz_found = False
        instruction_count = 0
        while not zzz_found:
            for instruction in instruction_line:
                instruction_count += 1
                current_key = self.get_key_from_instruction(
                    data_dict[current_key], instruction)
                if current_key == 'ZZZ':
                    zzz_found = True
                    break

        return instruction_count

    def solve_b(self, lines):
        data_dict = self.get_map_dictionary(lines)
        current_keys = self.get_starting_keys(data_dict)
        instruction_line = lines[0].replace('\n', '')
        __z_found = False
        instruction_count = 0
        while not __z_found:
            for instruction in instruction_line:
                instruction_count += 1
                current_keys = [self.get_key_from_instruction(
                    data_dict[x], instruction) for x in current_keys]

                if all(x[-1] == 'Z' for x in current_keys):
                    __z_found = True
                    break

        return instruction_count
