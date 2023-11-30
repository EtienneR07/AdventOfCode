from abc import ABC, abstractmethod


class abstract_solver(ABC):
    @abstractmethod
    def solve_a(self, file):
        pass

    @abstractmethod
    def solve_b(self, file):
        pass
