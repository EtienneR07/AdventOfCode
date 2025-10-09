import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay12 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);

        let regions = this.getRegions(lines);

        let totalPrice = 0;
        for (const region of regions) {
            totalPrice += this.calculatePrice(region, lines);
        }

        return totalPrice;
    }

    public solveB(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);

        let regions = this.getRegions(lines);

        let perimeters = this.toPerimeters(regions);

        console.log(perimeters);

        let totalPrice = 0;

        return totalPrice;
    }

    private toPerimeters(regions: [number, number][][]) {
        let perimeters: [number, number][][] = []
        for (const region of regions) {
            let arr = []
            let regionStr = region.map(r => `${r[0]}, ${r[1]}`);
            for (const point of region) {
                if (regionStr.includes(`${point[0] - 1}, ${point[1]}`)
                    && regionStr.includes(`${point[0] + 1}, ${point[1]}`)
                    && regionStr.includes(`${point[0]}, ${point[1] - 1}`)
                    && regionStr.includes(`${point[0]}, ${point[1] + 1}`)) {
                    continue;
                }
                arr.push(point);
            }
            perimeters.push(arr);
        }

        return perimeters;
    }

    private getRegions(array: string[])
        : [number, number][][] {
        let visited = new Set<string>();
        let regions: [number, number][][] = [];
        for (let y = 0; y < array.length; y++) {
            for (let x = 0; x < array[0].length; x++) {
                if (visited.has(`${x}, ${y}`)) continue;

                let region = this.search([[x, y]], array[y][x], array, visited);
                regions.push(region);
                for (const gardenPlot of region) {
                    visited.add(`${gardenPlot[0]}, ${gardenPlot[1]}`);
                }
            }
        }

        return regions;
    }

    private search(pointsToLook: [number, number][], char: string, array: string[], visited: Set<string>): [number, number][] {
        let region: [number, number][] = [];
        for (const point of pointsToLook) {
            let x = point[0];
            let y = point[1];

            if (visited.has(`${x}, ${y}`)) {
                continue;
            }

            visited.add(`${point[0]}, ${point[1]}`);

            if (array[y][x] === char) {
                region.push(point);
            }


            let adj = this.getAdjacentPlusOnes(array, point, char);

            region.push(...this.search(adj, char, array, visited));
        }

        return region;
    }

    private getAdjacentPlusOnes(array: string[], point: [number, number], char: string): [number, number][] {
        let adjacentValid: [number, number][] = []
        const offsets: [number, number][] = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1]
        ];

        for (const [dx, dy] of offsets) {
            let x = point[0] + dx;
            let y = point[1] + dy;

            if (this.validBounds(array, x, y) && char == array[y][x]) {
                adjacentValid.push([x, y])
            }
        }

        return adjacentValid;
    }

    private validBounds(lines: string[], Xindex: number, Yindex: number): boolean {
        let width = lines[0].length;
        let height = lines.length;

        return Xindex >= 0 && Xindex < width && Yindex >= 0 && Yindex < height;
    }

    private calculatePrice(region: [number, number][], array: string[]): number {
        let regionPlots = region.map(r => `${r[0]}, ${r[1]}`);
        let area = region.length;
        let perimeter = 0;
        for (const gardenPlot of region) {
            let gardenPlotPerimiter = 4;

            if (regionPlots.includes(`${gardenPlot[0] - 1}, ${gardenPlot[1]}`)) {
                gardenPlotPerimiter--;
            }

            if (regionPlots.includes(`${gardenPlot[0] + 1}, ${gardenPlot[1]}`)) {
                gardenPlotPerimiter--;
            }

            if (regionPlots.includes(`${gardenPlot[0]}, ${gardenPlot[1] - 1}`)) {
                gardenPlotPerimiter--;
            }

            if (regionPlots.includes(`${gardenPlot[0]}, ${gardenPlot[1] + 1}`)) {
                gardenPlotPerimiter--;
            }

            perimeter += gardenPlotPerimiter;
        }

        return area * perimeter;
    }
}

async function main() {
    const solver = new solverDay12();
    const generic = new Solver();
    generic.solveDay(solver, 12);
}

main();
