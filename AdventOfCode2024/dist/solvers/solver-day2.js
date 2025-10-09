"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay2 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay2 {
    Reader = new file_reader_1.default();
    solveA(lines) {
        return this.solve(lines);
    }
    solveB(lines) {
        return this.solve(lines, true);
    }
    rowSafe(number, tolerate) {
        let safe = true;
        let isAscending = false;
        let previous = 0;
        let beforePrevious = 0;
        let usedTolerance = false;
        for (const { index, current } of number.map((current, index) => ({ index, current }))) {
            if (index == 0) {
                previous = current;
                continue;
            }
            const diff = Math.abs(previous - current);
            let isCurrentlyAscending = previous < current;
            if (diff > 3 || diff === 0 || (index > 1 && isCurrentlyAscending !== isAscending)) {
                if (tolerate && !usedTolerance) {
                    usedTolerance = true;
                    continue;
                }
                else {
                    safe = false;
                    break;
                }
            }
            beforePrevious = previous;
            previous = current;
            isAscending = isCurrentlyAscending;
        }
        return safe;
    }
    solve(lines, tolerate = false) {
        let safeReportCount = 0;
        for (const line of lines) {
            const asNumbers = line.map(x => +x);
            let isSafe = this.rowSafe(asNumbers, tolerate);
            if (!isSafe)
                isSafe = this.rowSafe(asNumbers.reverse(), tolerate);
            if (isSafe)
                safeReportCount++;
        }
        return safeReportCount;
    }
}
exports.solverDay2 = solverDay2;
async function main() {
    const solver = new solverDay2();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 2);
}
main();
//# sourceMappingURL=solver-day2.js.map