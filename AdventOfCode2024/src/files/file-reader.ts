import fs from 'fs';

export default class FilerReader {
    public readFileAndParse(fileToLoad: string): Promise<string[][]> {
        return new Promise((resolve, reject) => {
            fs.readFile(fileToLoad, 'utf8', (err, data) => {
                const lines = data.split('\n').map(line => line.trim().split(/\s+/));
                resolve(lines);
            });
        });
    }
}