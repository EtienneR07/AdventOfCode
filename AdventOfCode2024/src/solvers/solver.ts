import { ISolver } from "../solver.inteface";
import FileReader from '../files/file-reader';

export class Solver {
    public async solveDay(solver: ISolver, day: number) {
        const filerReader = new FileReader();

        const testLines = await filerReader.readFileAndParse(`./src/files/day${day}_test.txt`);
        const actualLines = await filerReader.readFileAndParse(`./src/files/day${day}_actual.txt`);

        var resATest = solver.solveA(testLines)
        var resBTest = solver.solveB(testLines)

        var resA = solver.solveA(actualLines)
        var resB = solver.solveB(actualLines)

        console.log(resATest)
        console.log(resBTest)
        console.log(resA)
        console.log(resB)
    }
}