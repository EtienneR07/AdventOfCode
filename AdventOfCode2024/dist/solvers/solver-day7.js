"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay7 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay7 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        return this.solve(matrix, false);
    }
    solveB(matrix) {
        return this.solve(matrix, true);
    }
    solve(matrix, withConcatenation) {
        let sum = 0;
        for (const line of matrix) {
            let target = +line[0].replace(':', '');
            let numbers = line.slice(1).map(x => +x);
            let currentResultsToTest = [numbers[0]];
            for (const { index, nb } of numbers.map((nb, index) => ({ index, nb }))) {
                if (index == 0)
                    continue;
                let currentEquationResults = [];
                for (const toTest of currentResultsToTest) {
                    let sum = toTest + nb;
                    let mult = toTest * nb;
                    if (withConcatenation) {
                        let concatenation = +`${toTest}${nb}`;
                        if (concatenation <= target) {
                            currentEquationResults.push(concatenation);
                        }
                    }
                    if (sum <= target) {
                        currentEquationResults.push(sum);
                    }
                    if (mult <= target) {
                        currentEquationResults.push(mult);
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
exports.solverDay7 = solverDay7;
async function main() {
    const solver = new solverDay7();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 7);
}
main();
//# sourceMappingURL=solver-day7.js.map