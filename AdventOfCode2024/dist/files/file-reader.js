"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class FilerReader {
    readFileAndParse(fileToLoad) {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(fileToLoad, 'utf8', (err, data) => {
                const lines = data.split('\n').map(line => line.trim().split(/\s+/));
                resolve(lines);
            });
        });
    }
    toStringArray(matrix) {
        let newArray = [];
        for (const line of matrix) {
            newArray.push(line[0]);
        }
        return newArray;
    }
}
exports.default = FilerReader;
//# sourceMappingURL=file-reader.js.map