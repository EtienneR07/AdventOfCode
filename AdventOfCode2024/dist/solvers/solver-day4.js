"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay4 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay4 {
    Reader = new file_reader_1.default();
    solveA(lines) {
        let rows = this.Reader.toStringArray(lines);
        let totalCount = 0;
        totalCount += this.countArray(rows);
        let rotated = this.rotateRight(rows);
        totalCount += this.countArray(rotated);
        let diagonals = this.getDiagonals(rows);
        totalCount += this.countArray(diagonals);
        return totalCount;
    }
    solveB(lines) {
        let rows = this.Reader.toStringArray(lines);
        let totalCount = 0;
        let width = rows[0].length - 2;
        let height = rows.length - 2;
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                if (this.hasPattern(rows, x, y, ['M', 'S', 'M', 'S']))
                    totalCount++;
                if (this.hasPattern(rows, x, y, ['M', 'M', 'S', 'S']))
                    totalCount++;
                if (this.hasPattern(rows, x, y, ['S', 'M', 'S', 'M']))
                    totalCount++;
                if (this.hasPattern(rows, x, y, ['S', 'S', 'M', 'M']))
                    totalCount++;
            }
        }
        return totalCount;
    }
    hasPattern(lines, x, y, pattern) {
        if (lines[y + 1][x + 1] != 'A')
            return false;
        let topLeft = lines[y][x];
        let topRight = lines[y + 2][x];
        let bottomLeft = lines[y][x + 2];
        let bottomRight = lines[y + 2][x + 2];
        if (pattern[0] == topLeft
            && pattern[1] == topRight
            && pattern[2] == bottomLeft
            && pattern[3] == bottomRight)
            return true;
        return false;
    }
    countArray(rows) {
        let count = 0;
        for (const row of rows) {
            count += this.count(row);
        }
        return count;
    }
    solve(line) {
        return 1;
    }
    getDiagonals(lines) {
        let diagonals = [];
        let horLength = lines[0].length;
        let vertLength = lines.length;
        // Top left to top right
        for (let i = 0; i < horLength; i++) {
            let str = "";
            for (let x = i, y = 0; x < horLength && y < vertLength; x++, y++) {
                str += lines[y][x];
            }
            diagonals.push(str);
        }
        // Top left to bottom left
        for (let i = 1; i < vertLength; i++) {
            let str = "";
            for (let x = 0, y = i; x < horLength && y < vertLength; x++, y++) {
                str += lines[y][x];
            }
            diagonals.push(str);
        }
        // Top right to bottom right
        for (let i = horLength - 1; i >= 0; i--) {
            let str = "";
            for (let x = i, y = 0; x >= 0 && y < vertLength; x--, y++) {
                str += lines[y][x];
            }
            diagonals.push(str);
        }
        // Top right to top left
        for (let i = 1; i < vertLength; i++) {
            let str = "";
            for (let x = horLength - 1, y = i; x >= 0 && y < vertLength; x--, y++) {
                str += lines[y][x];
            }
            diagonals.push(str);
        }
        return diagonals;
    }
    rotateRight(lines) {
        let rotated = [];
        let horLength = lines[0].length;
        let vertLength = lines.length;
        for (let i = 0; i < horLength; i++) {
            let str = "";
            for (let j = vertLength - 1; j >= 0; j--) {
                str += lines[j][i];
            }
            rotated.push(str);
        }
        return rotated;
    }
    count(line) {
        let count = 0;
        const regex = /(?=(XMAS|SAMX))/g;
        let match;
        while ((match = regex.exec(line)) !== null) {
            count++;
            regex.lastIndex = match.index + 1;
        }
        return count;
    }
}
exports.solverDay4 = solverDay4;
async function main() {
    const solver = new solverDay4();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 4);
}
main();
//# sourceMappingURL=solver-day4.js.map