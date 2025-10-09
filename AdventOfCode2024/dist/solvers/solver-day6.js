"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay6 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Left"] = 3] = "Left";
})(Direction || (Direction = {}));
class solverDay6 {
    Reader = new file_reader_1.default();
    DirectionMovements = {
        [Direction.Up]: { x: 0, y: -1 },
        [Direction.Down]: { x: 0, y: 1 },
        [Direction.Right]: { x: 1, y: 0 },
        [Direction.Left]: { x: -1, y: 0 }
    };
    solveA(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        const startIndexes = this.getStartIndex(lines);
        return this.move(startIndexes, lines, Direction.Up, [`${startIndexes[0]}, ${startIndexes[1]}`]).count + 1;
    }
    solveB(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        const startIndexes = this.getStartIndex(lines);
        let steps = this.move(startIndexes, lines, Direction.Up, [`${startIndexes[0]}, ${startIndexes[1]}`]).steps;
        let stepsWithoutStart = steps.filter(s => s !== `${startIndexes[0]}, ${startIndexes[1]}`);
        let infiniteLoopCount = 0;
        for (const step of stepsWithoutStart.filter((value, index, self) => self.indexOf(value) === index)) {
            let stepIndex = step.split(',')
                .map(s => +s);
            let newLines = [...lines];
            newLines[stepIndex[1]] = this.replaceCharAt(newLines[stepIndex[1]], stepIndex[0], 'O');
            if (this.move(startIndexes, newLines, Direction.Up, [`${startIndexes[0]}, ${startIndexes[1]}`]).infiniteLoop) {
                infiniteLoopCount++;
            }
        }
        return infiniteLoopCount;
    }
    move(index, lines, currentDir, visited) {
        let currX = index[0];
        let currY = index[1];
        let count = 0;
        let height = lines.length;
        let width = lines[0].length;
        let infiniteLoop = false;
        while ((currX != 0 || currentDir != Direction.Left)
            && (currX != width - 1 || currentDir != Direction.Right)
            && (currY != height - 1 || currentDir != Direction.Down)
            && (currY != 0 || currentDir != Direction.Up)) {
            let nextX = currX + this.DirectionMovements[currentDir].x;
            let nextY = currY + this.DirectionMovements[currentDir].y;
            if (visited.length > 1 && this.infiniteLoop(`${nextX}, ${nextY}`, `${currX}, ${currY}`, visited)) {
                infiniteLoop = true;
                break;
            }
            if (lines[nextY][nextX] == '.' || lines[nextY][nextX] == '^') {
                if (!visited.includes(`${nextX}, ${nextY}`)) {
                    count++;
                }
                visited.push(`${nextX}, ${nextY}`);
                currX = nextX;
                currY = nextY;
            }
            if (lines[nextY][nextX] == '#' || lines[nextY][nextX] == 'O') {
                currentDir = this.getNextDirection(currentDir);
            }
        }
        return { count, steps: visited, infiniteLoop: infiniteLoop };
    }
    getNextDirection(currDir) {
        switch (currDir) {
            case Direction.Down:
                return Direction.Left;
            case Direction.Left:
                return Direction.Up;
            case Direction.Up:
                return Direction.Right;
            case Direction.Right:
                return Direction.Down;
        }
    }
    getStartIndex(lines) {
        for (let index = 0; index < lines.length; index++) {
            let charIndex = lines[index].indexOf('^');
            if (charIndex >= 0) {
                return [charIndex, index];
            }
        }
        return [-1, -1];
    }
    infiniteLoop(current, last, visited) {
        for (let i = 1; i < visited.length; i++) {
            if (visited[i - 1] === last && visited[i] === current) {
                return true;
            }
        }
        return false;
    }
    replaceCharAt(str, index, replacement) {
        return str.slice(0, index) + replacement + str.slice(index + 1);
    }
}
exports.solverDay6 = solverDay6;
async function main() {
    const solver = new solverDay6();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 6);
}
main();
//# sourceMappingURL=solver-day6.js.map