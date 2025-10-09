"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay24 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay24 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
    }
    solveB(matrix) {
    }
}
exports.solverDay24 = solverDay24;
async function main() {
    const solver = new solverDay24();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 24);
}
main();
//# sourceMappingURL=solver-day24.js.map