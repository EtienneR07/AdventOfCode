import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay11 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
        return this.solve(matrix, 25);
    }

    public solveB(matrix: string[][]) {
        return this.solve(matrix, 75);
    }

    public solve(matrix: string[][], nbOfIterations: number) {
        let stones = matrix[0].map(x => +x);

        let stonesMap = stones.reduce((map, num) => {
            map.set(num, 1);
            return map;
        }, new Map<number, number>());

        for (let i = 0; i < nbOfIterations; i++) {
            stonesMap = this.blink(stonesMap);
        }

        return Array.from(stonesMap.values()).reduce((acc, value) => acc + value, 0);
    }

    public blink(numbersMap: Map<number, number>): Map<number, number> {
        let newStones = new Map<number, number>();

        for (const [number, times] of numbersMap) {
            if (number === 0) {
                increment(1);
                continue;
            }

            let str = number.toString();
            if (str.length % 2 === 0) {
                const middle = str.length / 2;
                increment(+str.slice(0, middle));
                increment(+str.slice(middle));
                continue;
            }

            increment(number * 2024);

            function increment(numberKey: number): void {
                const currentValue = newStones.get(numberKey) || 0;
                newStones.set(numberKey, currentValue + times);
            }
        }

        return newStones;
    }
}

async function main() {
    const solver = new solverDay11();
    const generic = new Solver();
    generic.solveDay(solver, 11);
}

main();
