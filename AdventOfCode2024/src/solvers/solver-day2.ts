import { ISolver } from "../solver.inteface";
import FileReader from '../files/file-reader';
import { Solver } from "./solver";

export class solverDay2 implements ISolver {
    public solveA(lines: string[][]) {

    }

    public solveB(lines: string[][]) {

    }
}

async function main() {
    const solver = new solverDay2();
    const generic = new Solver();
    generic.solveDay(solver, 2);
}

main();
