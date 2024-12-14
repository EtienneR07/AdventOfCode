import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay10 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
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

    public solveB(matrix: string[][]) {
        let numbers = this.Reader.toStringArray(matrix).map(line => line.split('').map(Number));

        let trailheads = this.findAllZeros(numbers);

        let allTrails = 0;

        allTrails += this.search(numbers, trailheads);

        return allTrails;
    }

    private findAllSummits(accessiblePoints: number[][], array: number[][]): number {
        let count = 0;
        for (const accessiblePoint of accessiblePoints) {
            if (array[accessiblePoint[1]][accessiblePoint[0]] == 9) count++;
        }

        return count;
    }

    private search(array: number[][], toSearch: [number, number][]): number {
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

    private searchAccessible(array: number[][], toSearch: [number, number][], visited: [number, number][])
        : [number, number][] {
        for (const point of toSearch) {
            let x = point[0];
            let y = point[1];

            if (visited.some(p => p[0] === x && p[1] === y)) {
                continue;
            }

            visited.push(point)

            let adj = this.getAdjacentPlusOnes(array, point);

            visited = this.searchAccessible(array, adj, [...visited]);
        }

        return visited;
    }

    private getAdjacentPlusOnes(array: number[][], point: [number, number]): [number, number][] {
        let adjacentValid: [number, number][] = []
        let currentNb = array[point[1]][point[0]];

        const offsets: [number, number][] = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        for (const [dx, dy] of offsets) {
            let x = point[0] + dx;
            let y = point[1] + dy;
            if (this.validBounds(array, x, y) && array[y][x] == currentNb + 1) {
                adjacentValid.push([x, y])
            }
        }

        return adjacentValid;
    }

    private validBounds(lines: number[][], Xindex: number, Yindex: number): boolean {
        let width = lines[0].length;
        let height = lines.length;

        return Xindex >= 0 && Xindex < width && Yindex >= 0 && Yindex < height;
    }

    private findAllZeros(array: number[][]): [number, number][] {
        let zeros: [number, number][] = [];

        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[y].length; x++) {
                if (array[y][x] == 0) zeros.push([x, y]);
            }
        }

        return zeros;
    }
}

async function main() {
    const solver = new solverDay10();
    const generic = new Solver();
    generic.solveDay(solver, 10);
}

main();
