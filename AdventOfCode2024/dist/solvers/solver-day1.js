"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay1 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay1 {
    Reader = new file_reader_1.default();
    solveA(lines) {
        const firstRow = lines.map(l => l[0]).sort((a, b) => +a - +b);
        const secondRow = lines.map(l => l[1]).sort((a, b) => +a - +b);
        const diffArray = [];
        for (const { index, value } of firstRow.map((value, index) => ({ index, value }))) {
            const valueSecondRow = secondRow[index];
            if (valueSecondRow > value) {
                diffArray.push(+valueSecondRow - +value);
            }
            else {
                diffArray.push(+value - +valueSecondRow);
            }
        }
        return diffArray.reduce((sum, current) => sum + current, 0);
    }
    solveB(lines) {
        const firstRow = lines.map(l => l[0]);
        const secondRow = lines.map(l => l[1]);
        const simArray = [];
        for (const element of firstRow) {
            const count = secondRow.filter(i => i == element).length;
            simArray.push(+element * count);
        }
        return simArray.reduce((sum, current) => sum + current, 0);
    }
}
exports.solverDay1 = solverDay1;
async function main() {
    const solver = new solverDay1();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 1);
}
main();
//# sourceMappingURL=solver-day1.js.map