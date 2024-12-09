import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay7 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
        return this.solve(matrix, false);
    }

    public solveB(matrix: string[][]) {
        return this.solve(matrix, true);
    }

    public solve(matrix: string[][], withConcatenation: boolean) {
        let sum = 0;

        for (const line of matrix) {
            let target = +line[0].replace(':', '')
            let numbers = line.slice(1).map(x => +x);

            let currentResultsToTest = [numbers[0]];
            for (const { index, nb } of numbers.map((nb, index) => ({ index, nb }))) {
                if (index == 0) continue;

                let currentEquationResults = [];
                for (const toTest of currentResultsToTest) {
                    let sum = toTest + nb;
                    let mult = toTest * nb;
                    if (withConcatenation) {
                        let concatenation = +`${toTest}${nb}`

                        if (concatenation <= target) {
                            currentEquationResults.push(concatenation)
                        }
                    }

                    if (sum <= target) {
                        currentEquationResults.push(sum)
                    }

                    if (mult <= target) {
                        currentEquationResults.push(mult)
                    }
                }

                currentResultsToTest = currentEquationResults;
            }

            if (currentResultsToTest.filter(r => r == target).length > 0) {
                sum += target;
            }
        }

        return sum;
    }
}

async function main() {
    const solver = new solverDay7();
    const generic = new Solver();
    generic.solveDay(solver, 7);
}

main();
