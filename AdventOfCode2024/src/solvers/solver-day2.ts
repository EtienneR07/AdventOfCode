import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay2 implements ISolver {
    public solveA(lines: string[][]) {
        return this.solve(lines);
    }

    public solveB(lines: string[][]) {
        return this.solve(lines, true);
    }

    public rowSafe(number: number[], tolerate: boolean): boolean {
        let safe = true;
        let isAscending = false;
        let previous = 0;
        let beforePrevious = 0;
        let usedTolerance = false;

        for (const { index, current } of number.map((current, index) => ({ index, current }))) {
            if (index == 0) {
                previous = current;
                continue;
            }

            const diff = Math.abs(previous - current);
            let isCurrentlyAscending = previous < current;

            if (diff > 3 || diff === 0 || (index > 1 && isCurrentlyAscending !== isAscending)) {
                if (tolerate && !usedTolerance) {
                    usedTolerance = true;
                    continue;
                } else {
                    safe = false;
                    break;
                }
            }

            beforePrevious = previous;
            previous = current;
            isAscending = isCurrentlyAscending;
        }

        return safe;
    }

    private solve(lines: string[][], tolerate: boolean = false) {
        let safeReportCount = 0;
        for (const line of lines) {
            const asNumbers = line.map(x => +x);
            let isSafe = this.rowSafe(asNumbers, tolerate);

            if (!isSafe)
                isSafe = this.rowSafe(asNumbers.reverse(), tolerate);

            if (isSafe) safeReportCount++;
        }

        return safeReportCount;
    }
}

async function main() {
    const solver = new solverDay2();
    const generic = new Solver();
    generic.solveDay(solver, 2);
}

main();
