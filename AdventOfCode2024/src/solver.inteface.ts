import FilerReader from "./files/file-reader";

export interface ISolver {
    Reader: FilerReader
    solveA(lines: string[][]): any;
    solveB(lines: string[][]): any;
}