import { ISolver } from "../solver.inteface";
import FileReader from '../files/file-reader';

export class Solver {
    public async solveDay(solver: ISolver, day: number) {
        const filerReader = new FileReader();

        const testLines = await filerReader.readFileAndParse(`./src/files/day${day}/test.txt`);
        const actualLines = await filerReader.readFileAndParse(`./src/files/day${day}/actual.txt`);

        var resATest = solver.solveA(testLines)
        var resA = solver.solveA(actualLines)

        var resBTest = solver.solveB(testLines)
        var resB = solver.solveB(actualLines)

        console.log(`Test A: ${resATest}`);
        console.log(`Actual A: ${resA}`)

        console.log(`Test B: ${resBTest}`)
        console.log(`Actual B: ${resB}`)
    }
}