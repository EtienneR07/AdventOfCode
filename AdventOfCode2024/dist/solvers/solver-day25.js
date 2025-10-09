"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay25 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay25 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
    }
    solveB(matrix) {
    }
}
exports.solverDay25 = solverDay25;
async function main() {
    const solver = new solverDay25();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 25);
}
main();
//# sourceMappingURL=solver-day25.js.map