"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay10 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay10 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        let numbers = this.Reader.toStringArray(matrix).map(line => line.split('').map(Number));
        let trailheads = this.findAllZeros(numbers);
        let totalPoints = 0;
        for (const trailhead of trailheads) {
            let accessiblePoints = this.searchAccessible(numbers, [trailhead], []);
            totalPoints += this.findAllSummits(accessiblePoints, numbers);
        }
        console.log(totalPoints);
        return totalPoints;
    }
    solveB(matrix) {
        let numbers = this.Reader.toStringArray(matrix).map(line => line.split('').map(Number));
        let trailheads = this.findAllZeros(numbers);
        let allTrails = 0;
        allTrails += this.search(numbers, trailheads);
        return allTrails;
    }
    findAllSummits(accessiblePoints, array) {
        let count = 0;
        for (const accessiblePoint of accessiblePoints) {
            if (array[accessiblePoint[1]][accessiblePoint[0]] == 9)
                count++;
        }
        return count;
    }
    search(array, toSearch) {
        let count = 0;
        for (const point of toSearch) {
            let x = point[0];
            let y = point[1];
            if (array[y][x] === 9) {
                count++;
                continue;
            }
            let adj = this.getAdjacentPlusOnes(array, point);
            count += this.search(array, adj);
        }
        return count;
    }
    searchAccessible(array, toSearch, visited) {
        for (const point of toSearch) {
            let x = point[0];
            let y = point[1];
            if (visited.some(p => p[0] === x && p[1] === y)) {
                continue;
            }
            visited.push(point);
            let adj = this.getAdjacentPlusOnes(array, point);
            visited = this.searchAccessible(array, adj, [...visited]);
        }
        return visited;
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
    findAllZeros(array) {
        let zeros = [];
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                if (array[y][x] == 0)
                    zeros.push([x, y]);
            }
        }
        return zeros;
    }
}
exports.solverDay10 = solverDay10;
async function main() {
    const solver = new solverDay10();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 10);
}
main();
//# sourceMappingURL=solver-day10.js.map