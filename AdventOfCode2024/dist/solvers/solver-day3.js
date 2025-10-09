"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay3 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay3 {
    Reader = new file_reader_1.default();
    solveA(lines) {
        const flattened = lines.flat().join("");
        return this.solve(flattened);
    }
    solveB(lines) {
        const flattened = lines.flat().join("");
        return this.solve(flattened, true);
    }
    solve(text, withDoDontRestrictions = false) {
        let doMult = true;
        const toAdd = [];
        const matches = [];
        const regex = /(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            matches.push(match[0]);
        }
        console.log(matches);
        for (const firstMatch of matches) {
            if (firstMatch == "don't()") {
                doMult = false;
                continue;
            }
            if (firstMatch == "do()") {
                doMult = true;
                continue;
            }
            const digitRegex = /(\d{1,3})/g;
            let digitMatch;
            let digits = [];
            while ((digitMatch = digitRegex.exec(firstMatch)) !== null) {
                digits.push(+digitMatch[0]);
            }
            if (!withDoDontRestrictions || doMult) {
                toAdd.push(digits[0] * digits[1]);
            }
        }
        return toAdd.reduce((sum, current) => sum + current, 0);
    }
}
exports.solverDay3 = solverDay3;
async function main() {
    const solver = new solverDay3();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 3);
}
main();
//# sourceMappingURL=solver-day3.js.map