from solver_module import abstract_solver
from ..helpers.file_helper import get_file


class Solver1(abstract_solver):
    def method1(self, file):
        print("Implementing method2")

    def method2(self, file):
        print("Implementing method2")


data = get_file("day1")
