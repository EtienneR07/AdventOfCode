"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solver = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
class Solver {
    async solveDay(solver, day) {
        const filerReader = new file_reader_1.default();
        const testLines = await filerReader.readFileAndParse(`./src/files/day${day}/test.txt`);
        const actualLines = await filerReader.readFileAndParse(`./src/files/day${day}/actual.txt`);
        var a = solver.solveA(testLines);
        var b = solver.solveB(testLines);
        console.log(`A: ${a}`);
        console.log(`B: ${b}`);
    }
}
exports.Solver = Solver;
//# sourceMappingURL=solver.js.map