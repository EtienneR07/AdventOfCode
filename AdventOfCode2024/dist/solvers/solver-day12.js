"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay12 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay12 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        this.getRegions(lines);
        return 0;
    }
    solveB(matrix) {
        return 0;
    }
    getRegions(array) {
        let visited = new Set();
        let regions = [];
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[0].length; x++) {
                if (visited.has(`${x}, ${y}`))
                    continue;
                let region = this.search([[x, y]], array[y][x], array, visited);
                regions.push(region);
                for (const gardenPlot of region) {
                    visited.add(`${gardenPlot[0]}, ${gardenPlot[1]}`);
                }
            }
        }
        return regions;
    }
    search(pointsToLook, char, array, visited) {
        let region = [];
        for (const point of pointsToLook) {
            let x = point[0];
            let y = point[1];
            if (visited.has(`${x}, ${y}`) || array[y][x] !== char) {
                continue;
            }
            if (array[y][x] === char) {
                region.push(point);
            }
            visited.add(`${point[0]}, ${point[1]}`);
            let adj = this.getAdjacentPlusOnes(array, point);
            region.push(...this.search(adj, char, array, visited));
        }
        return region;
    }
    getAdjacentPlusOnes(array, point) {
        let adjacentValid = [];
        let currentNb = array[point[1]][point[0]];
        const offsets = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];
        for (const [dx, dy] of offsets) {
            let x = point[0] + dx;
            let y = point[1] + dy;
            if (this.validBounds(array, x, y) && array[y][x] == currentNb + 1) {
                adjacentValid.push([x, y]);
            }
        }
        return adjacentValid;
    }
    validBounds(lines, Xindex, Yindex) {
        let width = lines[0].length;
        let height = lines.length;
        return Xindex >= 0 && Xindex < width && Yindex >= 0 && Yindex < height;
    }
}
exports.solverDay12 = solverDay12;
async function main() {
    const solver = new solverDay12();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 12);
}
main();
//# sourceMappingURL=solver-day12.js.map