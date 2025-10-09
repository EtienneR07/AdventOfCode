import { ISolver } from "../solver.inteface";
import FileReader from '../files/file-reader';

export class Solver {
    public async solveDay(solver: ISolver, day: number) {
        const filerReader = new FileReader();

        const testLines = await filerReader.readFileAndParse(`./src/files/day${day}/test.txt`);
        const actualLines = await filerReader.readFileAndParse(`./src/files/day${day}/actual.txt`);

        var a = solver.solveA(actualLines)
        var b = solver.solveB(testLines)

        console.log(`A: ${a}`);
        console.log(`B: ${b}`);
    }
}