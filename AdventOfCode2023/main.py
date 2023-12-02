import sys
from importlib import import_module
from helpers.file_helper import get_file
import argparse
import os


def main():
    solvers_directory = os.path.join(os.path.dirname(__file__), 'solvers')
    sys.path.append(solvers_directory)

    parser = argparse.ArgumentParser()

    parser.add_argument("--solveA", action="store_true",
                        help="execute Solver A")
    parser.add_argument("--solveB", action="store_true",
                        help="execute Solver B")
    parser.add_argument("--dayNumber", type=str, help="Specify the day")
    parser.add_argument("--fileName", type=str, help="Specify data file name")

    args = parser.parse_args()

    day_number = args.dayNumber
    file_name = args.fileName
    if day_number is None or file_name is None:
        print('A day AND a file must be specified')
        sys.exit()

    module = __import__(f"solver_day_{day_number}")
    class_ = getattr(module, f"Solver{day_number}")
    instance = class_()

    file = get_file(file_name)

    if args.solveA:
        resultA = instance.solve_a(file)
        print(resultA)

    if args.solveB:
        resultB = instance.solve_b(file)
        print(resultB)


if __name__ == "__main__":
    main()
