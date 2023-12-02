

def get_file_lines(fileName):
    file = open(f"./files/{fileName}.txt", "r")
    lines = file.readlines()
    return lines
