import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay19 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {

    }

    public solveB(matrix: string[][]) {

    }
}

async function main() {
    const solver = new solverDay19();
    const generic = new Solver();
    generic.solveDay(solver, 19);
}

main();
