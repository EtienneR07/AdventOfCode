"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay8 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay8 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        let nodeMap = this.getNodeIndexes(lines);
        let pairs = this.getPairs(nodeMap);
        let antinodes = [];
        for (const pair of pairs) {
            let firstPoint = pair[0];
            let secondPoint = pair[1];
            let xDiff = secondPoint[0] - firstPoint[0];
            let yDiff = secondPoint[1] - firstPoint[1];
            this.addAntinodeIfValid(lines, firstPoint, -xDiff, -yDiff, antinodes);
            this.addAntinodeIfValid(lines, secondPoint, xDiff, yDiff, antinodes);
        }
        return antinodes.length;
    }
    solveB(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        let nodeMap = this.getNodeIndexes(lines);
        let pairs = this.getPairs(nodeMap);
        let antinodes = [];
        for (const pair of pairs) {
            let firstPoint = pair[0];
            let secondPoint = pair[1];
            let xDiff = secondPoint[0] - firstPoint[0];
            let yDiff = secondPoint[1] - firstPoint[1];
            this.tryPushAntinode(antinodes, firstPoint);
            this.tryPushAntinode(antinodes, secondPoint);
            this.addAntinodeIfValid(lines, firstPoint, -xDiff, -yDiff, antinodes, true);
            this.addAntinodeIfValid(lines, secondPoint, xDiff, yDiff, antinodes, true);
        }
        console.log(antinodes);
        return antinodes.length;
    }
    addAntinodeIfValid(lines, point, xDiff, yDiff, antinodes, withIterations = false) {
        let valid = true;
        let currentPoint = point;
        while (valid) {
            if (!withIterations)
                valid = false;
            if (this.validXBounds(lines, currentPoint[0], xDiff) && this.validYBounds(lines, currentPoint[1], yDiff)) {
                let newX = currentPoint[0] + xDiff;
                let newY = currentPoint[1] + yDiff;
                let antinode = [currentPoint[0] + xDiff, currentPoint[1] + yDiff];
                this.tryPushAntinode(antinodes, antinode);
                currentPoint = [newX, newY];
            }
            else {
                valid = false;
            }
        }
    }
    tryPushAntinode(antinodes, antinode) {
        if (!antinodes.includes(`${antinode}`)) {
            antinodes.push(`${antinode}`);
        }
    }
    validXBounds(lines, Xindex, diff) {
        let width = lines[0].length;
        return Xindex + diff >= 0 && Xindex + diff < width;
    }
    validYBounds(lines, Yindex, diff) {
        let height = lines.length;
        return Yindex + diff >= 0 && Yindex + diff < height;
    }
    getNodeIndexes(lines) {
        let map = new Map();
        for (const { y, line } of lines.map((line, y) => ({ y, line }))) {
            for (let x = 0; x < line.length; x++) {
                let char = line[x];
                if (char == '.' || char == '#')
                    continue;
                let value = map.get(char) ?? [];
                value.push([x, y]);
                map.set(char, value);
            }
        }
        for (const [key, value] of map) {
            if (value.length <= 1)
                map.delete(key);
        }
        return map;
    }
    getPairs(nodeMap) {
        let pairs = [];
        for (let [key, points] of nodeMap) {
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    pairs.push([points[i], points[j]]);
                }
            }
        }
        return pairs;
    }
}
exports.solverDay8 = solverDay8;
async function main() {
    const solver = new solverDay8();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 8);
}
main();
//# sourceMappingURL=solver-day8.js.map