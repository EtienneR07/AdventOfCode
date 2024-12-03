import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay1 implements ISolver {
    public solveA(lines: string[][]) {
        const firstRow = lines.map(l => l[0]).sort((a, b) => +a - +b);
        const secondRow = lines.map(l => l[1]).sort((a, b) => +a - +b);
        const diffArray = []
        for (const { index, value } of firstRow.map((value, index) => ({ index, value }))) {
            const valueSecondRow = secondRow[index];

            if (valueSecondRow > value) {
                diffArray.push(+valueSecondRow - +value)
            } else {
                diffArray.push(+value - +valueSecondRow)
            }
        }

        return diffArray.reduce((sum, current) => sum + current, 0)
    }

    public solveB(lines: string[][]) {
        const firstRow = lines.map(l => l[0]);
        const secondRow = lines.map(l => l[1]);
        const simArray = []
        for (const element of firstRow) {
            const count = secondRow.filter(i => i == element).length;
            simArray.push(+element * count)
        }

        return simArray.reduce((sum, current) => sum + current, 0)
    }
}

async function main() {
    const solver = new solverDay1();
    const generic = new Solver();
    generic.solveDay(solver, 1);
}

main();
