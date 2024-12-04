import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay3 implements ISolver {
    public solveA(lines: string[][]) {
        const flattened = lines.flat().join("");
        return this.solve(flattened);

    }

    public solveB(lines: string[][]) {
        const flattened = lines.flat().join("");
        return this.solve(flattened, true);
    }

    private solve(text: string, withDoDontRestrictions: boolean = false) {
        let doMult = true;
        const toAdd = [];
        const matches: string[] = [];

        const regex = /(mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\))/g;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(text)) !== null) {
            matches.push(match[0]);
        }

        console.log(matches)

        for (const firstMatch of matches) {
            if (firstMatch == "don't()") {
                doMult = false;
                continue;
            }

            if (firstMatch == "do()") {
                doMult = true;
                continue;
            }

            const digitRegex = /(\d{1,3})/g
            let digitMatch: RegExpExecArray | null;
            let digits = []
            while ((digitMatch = digitRegex.exec(firstMatch)) !== null) {
                digits.push(+digitMatch[0]);
            }

            if (!withDoDontRestrictions || doMult) {
                toAdd.push(digits[0] * digits[1]);
            }
        }

        return toAdd.reduce((sum, current) => sum + current, 0)
    }
}

async function main() {
    const solver = new solverDay3();
    const generic = new Solver();
    generic.solveDay(solver, 3);
}

main();