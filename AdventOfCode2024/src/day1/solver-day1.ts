import { ISolver } from "../solver.inteface";
import fs from 'fs';
import FileReader from '../files/file-reader';

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
    const filerReader = new FileReader();

    const testLines = await filerReader.readFileAndParse('./src/files/day1_test.txt');
    const actualLines = await filerReader.readFileAndParse('./src/files/day1_actual.txt');

    var resATest = solver.solveA(testLines)
    var resBTest = solver.solveB(testLines)

    var resA = solver.solveA(actualLines)
    var resB = solver.solveB(actualLines)

    console.log(resATest)
    console.log(resBTest)
    console.log(resA)
    console.log(resB)
}

main();
