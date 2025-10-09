"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay15 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay15 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
    }
    solveB(matrix) {
    }
}
exports.solverDay15 = solverDay15;
async function main() {
    const solver = new solverDay15();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 15);
}
main();
//# sourceMappingURL=solver-day15.js.map