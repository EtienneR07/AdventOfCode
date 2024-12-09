import FilerReader from "../files/file-reader";
import { ISolver } from "../solver.inteface";
import { Solver } from "./solver";

export class solverDay5 implements ISolver {
    public Reader = new FilerReader();

    public solveA(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);
        let rulesAndUpdates = this.separate(lines);
        let rulesDictionary = this.getRules(rulesAndUpdates.Rules);
        const validUpdates = this.separateValidations(rulesAndUpdates.Updates, rulesDictionary).Valid;

        return this.getMiddleSum(validUpdates);
    }

    public solveB(matrix: string[][]) {
        let lines = this.Reader.toStringArray(matrix);
        let rulesAndUpdates = this.separate(lines);
        let rulesDictionary = this.getRules(rulesAndUpdates.Rules);
        const invalidUpdates = this.separateValidations(rulesAndUpdates.Updates, rulesDictionary).Invalid;

        for (const update of invalidUpdates) {
            update.sort((n1: number, n2: number) => {
                if (rulesAndUpdates.Rules.includes(`${n1}|${n2}`)) {
                    return -1;
                }

                return 1;
            })
        }

        return this.getMiddleSum(invalidUpdates);
    }

    private getRules(rules: string[]): { [page: number]: number[] } {
        var rulesDictionary: { [page: number]: number[] } = {};
        for (const rule of rules) {
            let split = rule.split('|')
            let pageBefore = +split[0];
            let page = +split[1];

            rulesDictionary[page] = rulesDictionary[page] ?? [];
            rulesDictionary[page].push(pageBefore);
        }

        return rulesDictionary;
    }

    private getMiddleSum(updates: number[][]) {
        let sum = 0;
        for (const numbers of updates) {
            if (numbers.length % 2 !== 1) continue;

            let index = Math.ceil(numbers.length / 2) - 1;
            sum += numbers[index]
        }

        return sum;
    }

    private separateValidations(
        updates: number[][],
        rulesDictionary: { [page: number]: number[] })
        : { Valid: number[][], Invalid: number[][] } {
        let validUpdates: number[][] = [];
        let invalidUpdates: number[][] = [];
        for (const update of updates) {
            let prohibited: number[] = [];
            let valid = true;

            for (const number of update) {
                let requirements = rulesDictionary[number];

                if (prohibited.includes(number)) {
                    valid = false;
                    break;
                }

                if (requirements) {
                    prohibited.push(...requirements);
                }
            }

            if (valid)
                validUpdates.push(update);
            else
                invalidUpdates.push(update);
        }

        return { Valid: validUpdates, Invalid: invalidUpdates };
    }

    private separate(lines: string[]): { Rules: string[], Updates: number[][] } {
        let rules = []
        let updates = []
        let readingRules = true;
        for (const line of lines) {
            if (line == '') {
                readingRules = false
                continue;
            }

            if (readingRules) {
                rules.push(line)
            } else {
                updates.push(line.split(',').map(x => +x))
            }
        }

        return { Rules: rules, Updates: updates };
    }
}

async function main() {
    const solver = new solverDay5();
    const generic = new Solver();
    generic.solveDay(solver, 5);
}

main();