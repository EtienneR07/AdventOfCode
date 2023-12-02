import sys
from importlib import import_module
from helpers.file_helper import get_file
import argparse
import os


def main():
    solvers_directory = os.path.join(os.path.dirname(__file__), 'solvers')
    sys.path.append(solvers_directory)

    parser = argparse.ArgumentParser()
    parser.add_argument("--runTestA", type=int,
                        help="run test for solver A with expected value")
    parser.add_argument("--runTestB", type=int,
                        help="run test for solver A with expected value")
    parser.add_argument("--solveA", action="store_true",
                        help="execute Solver A")
    parser.add_argument("--solveB", action="store_true",
                        help="execute Solver B")
    parser.add_argument("--dayNumber", type=str, help="Specify the day")

    args = parser.parse_args()

    day_number = args.dayNumber
    if day_number is None:
        print('A day must be specified')
        sys.exit()

    module = __import__(f"solver_day_{day_number}")
    class_ = getattr(module, f"Solver{day_number}")
    instance = class_()

    file = get_file(f"day{day_number}")

    if args.solveA:
        resultA = instance.solve_a(file)
        print(resultA)

    if args.solveB:
        resultB = instance.solve_b(file)
        print(resultB)


if __name__ == "__main__":
    main()
