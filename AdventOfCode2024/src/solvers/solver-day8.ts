import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay8 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);
        let nodeMap = this.getNodeIndexes(lines);

        let pairs = this.getPairs(nodeMap);

        let antinodes: string[] = [];
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

    public solveB(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);
        let nodeMap = this.getNodeIndexes(lines);

        let pairs = this.getPairs(nodeMap);
        let antinodes: string[] = [];
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

    private addAntinodeIfValid(
        lines: any,
        point: [number, number],
        xDiff: number,
        yDiff: number,
        antinodes: string[],
        withIterations: boolean = false
    ): void {
        let valid = true
        let currentPoint = point;
        while (valid) {
            if (!withIterations) valid = false;
            if (this.validXBounds(lines, currentPoint[0], xDiff) && this.validYBounds(lines, currentPoint[1], yDiff)) {
                let newX = currentPoint[0] + xDiff;
                let newY = currentPoint[1] + yDiff;
                let antinode: [number, number] = [currentPoint[0] + xDiff, currentPoint[1] + yDiff];
                this.tryPushAntinode(antinodes, antinode);

                currentPoint = [newX, newY];
            } else {
                valid = false;
            }
        }
    }

    private tryPushAntinode(antinodes: string[], antinode: [number, number]) {
        if (!antinodes.includes(`${antinode}`)) {
            antinodes.push(`${antinode}`);
        }
    }

    private validXBounds(lines: string[], Xindex: number, diff: number): boolean {
        let width = lines[0].length;

        return Xindex + diff >= 0 && Xindex + diff < width;
    }

    private validYBounds(lines: string[], Yindex: number, diff: number): boolean {
        let height = lines.length;

        return Yindex + diff >= 0 && Yindex + diff < height;
    }

    private getNodeIndexes(lines: string[]): Map<string, [number, number][]> {
        let map = new Map<string, [number, number][]>();

        for (const { y, line } of lines.map((line, y) => ({ y, line }))) {
            for (let x = 0; x < line.length; x++) {
                let char = line[x];
                if (char == '.' || char == '#') continue;

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

    private getPairs(nodeMap: Map<string, [number, number][]>): [[number, number], [number, number]][] {
        let pairs: [[number, number], [number, number]][] = [];
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

async function main() {
    const solver = new solverDay8();
    const generic = new Solver();
    generic.solveDay(solver, 8);
}

main();
