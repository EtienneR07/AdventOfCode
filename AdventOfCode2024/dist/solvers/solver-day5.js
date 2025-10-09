"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solverDay5 = void 0;
const file_reader_1 = __importDefault(require("../files/file-reader"));
const solver_1 = require("./solver");
class solverDay5 {
    Reader = new file_reader_1.default();
    solveA(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        let rulesAndUpdates = this.separate(lines);
        let rulesDictionary = this.getRules(rulesAndUpdates.Rules);
        const validUpdates = this.separateValidations(rulesAndUpdates.Updates, rulesDictionary).Valid;
        return this.getMiddleSum(validUpdates);
    }
    solveB(matrix) {
        let lines = this.Reader.toStringArray(matrix);
        let rulesAndUpdates = this.separate(lines);
        let rulesDictionary = this.getRules(rulesAndUpdates.Rules);
        const invalidUpdates = this.separateValidations(rulesAndUpdates.Updates, rulesDictionary).Invalid;
        for (const update of invalidUpdates) {
            update.sort((n1, n2) => {
                if (rulesAndUpdates.Rules.includes(`${n1}|${n2}`)) {
                    return -1;
                }
                return 1;
            });
        }
        return this.getMiddleSum(invalidUpdates);
    }
    getRules(rules) {
        var rulesDictionary = {};
        for (const rule of rules) {
            let split = rule.split('|');
            let pageBefore = +split[0];
            let page = +split[1];
            rulesDictionary[page] = rulesDictionary[page] ?? [];
            rulesDictionary[page].push(pageBefore);
        }
        return rulesDictionary;
    }
    getMiddleSum(updates) {
        let sum = 0;
        for (const numbers of updates) {
            if (numbers.length % 2 !== 1)
                continue;
            let index = Math.ceil(numbers.length / 2) - 1;
            sum += numbers[index];
        }
        return sum;
    }
    separateValidations(updates, rulesDictionary) {
        let validUpdates = [];
        let invalidUpdates = [];
        for (const update of updates) {
            let prohibited = [];
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
    separate(lines) {
        let rules = [];
        let updates = [];
        let readingRules = true;
        for (const line of lines) {
            if (line == '') {
                readingRules = false;
                continue;
            }
            if (readingRules) {
                rules.push(line);
            }
            else {
                updates.push(line.split(',').map(x => +x));
            }
        }
        return { Rules: rules, Updates: updates };
    }
}
exports.solverDay5 = solverDay5;
async function main() {
    const solver = new solverDay5();
    const generic = new solver_1.Solver();
    generic.solveDay(solver, 5);
}
main();
//# sourceMappingURL=solver-day5.js.map