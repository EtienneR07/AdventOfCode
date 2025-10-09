"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay9 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay9 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        let line = this.Reader.toStringArray(matrix)[0];
        let array = this.getNumberArray(line);
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] == -1)
                continue;
            let firstEmptySpot = array.indexOf(-1);
            if (firstEmptySpot > i || !firstEmptySpot)
                break;
            array[firstEmptySpot] = array[i];
            array[i] = -1;
        }
        return this.getChecksum(array);
    }
    solveB(matrix) {
        let line = this.Reader.toStringArray(matrix)[0];
        let array = this.getNumberArray(line);
        array = this.reorganizeArray(array);
        console.log(array);
        return this.getChecksum(array);
    }
    getChecksum(array) {
        let checksum = 0;
        for (let i = 0; i < array.length; i++) {
            let value = array[i];
            if (value == -1)
                value = 0;
            checksum += value * i;
        }
        return checksum;
    }
    getNumberArray(line) {
        let array = [];
        for (let i = 0; i < line.length; i++) {
            const count = +line[i];
            if (i % 2 === 0) {
                for (let j = 0; j < count; j++) {
                    array.push(i / 2);
                }
            }
            else {
                for (let j = 0; j < count; j++) {
                    array.push(-1);
                }
            }
        }
        return array;
    }
    reorganizeArray(array) {
        let streak = 0;
        let currentNumber = -2;
        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i] === currentNumber && currentNumber !== -1) {
                streak++;
            }
            else {
                if (streak > 0) {
                    let emptyIndex = this.getIndexOfFirstEmptyStreak(array, streak);
                    if (emptyIndex !== null && emptyIndex < i) {
                        for (let j = 0; j < streak; j++) {
                            array[emptyIndex + j] = currentNumber;
                            array[i + j + 1] = -1;
                        }
                    }
                }
                currentNumber = array[i];
                streak = array[i] !== -1 ? 1 : 0;
            }
        }
        return array;
    }
    getIndexOfFirstEmptyStreak(array, streakNb) {
        let current = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === -1) {
                current++;
                if (current === streakNb) {
                    return i - streakNb + 1;
                }
            }
            else {
                current = 0;
            }
        }
        return null;
    }
}
exports.solverDay9 = solverDay9;
async function main() {
    const solver = new solverDay9();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 9);
}
main();
//# sourceMappingURL=solver-day9.js.map