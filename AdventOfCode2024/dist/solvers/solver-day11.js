"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay11 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay11 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        return this.solve(matrix, 25);
    }
    solveB(matrix) {
        return this.solve(matrix, 75);
    }
    solve(matrix, nbOfIterations) {
        let stones = matrix[0].map(x => +x);
        let stonesMap = stones.reduce((map, num) => {
            map.set(num, 1);
            return map;
        }, new Map());
        for (let i = 0; i < nbOfIterations; i++) {
            stonesMap = this.blink(stonesMap);
        }
        return Array.from(stonesMap.values()).reduce((acc, value) => acc + value, 0);
    }
    blink(numbersMap) {
        let newStones = new Map();
        for (const [number, times] of numbersMap) {
            if (number === 0) {
                increment(1);
                continue;
            }
            let str = number.toString();
            if (str.length % 2 === 0) {
                const middle = str.length / 2;
                increment(+str.slice(0, middle));
                increment(+str.slice(middle));
                continue;
            }
            increment(number * 2024);
            function increment(numberKey) {
                const currentValue = newStones.get(numberKey) || 0;
                newStones.set(numberKey, currentValue + times);
            }
        }
        return newStones;
    }
}
exports.solverDay11 = solverDay11;
async function main() {
    const solver = new solverDay11();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 11);
}
main();
//# sourceMappingURL=solver-day11.js.map