import * as fs from 'fs';

function checkReport(report: number[]): number {
    let wrongIndex: number = -1;
    let mul: number = report[0] - report[1] > 0 ? 1 : -1;
    for (let i: number = 0; i < report.length - 1; i++) {
        let partial: number = (report[i] - report[i + 1]) * mul
        if (partial < 1 || partial > 3) {
            wrongIndex = i;
            break
        }
    }

    return wrongIndex
}


const words: string = fs.readFileSync('./data1.txt', 'utf-8');
const wordList: string[] = words.split('\r\n');


let reports: number[][] = [];

for (const word of wordList) {
    let partialReports: number[] = [];
    let line: string[] = word.split(' ');
    for (const word of line) {
        partialReports.push(parseInt(word));
    }
    reports.push(partialReports);
}

let numOfSave: number = 0;

for (const report of reports) {
    if (checkReport(report) === -1) {
        numOfSave++;
    }
}

console.log("ex1: ", numOfSave);

let numOfSave2: number = 0;

for (const report of reports) {
    let index: number = checkReport(report);
    if (index === -1) {
        numOfSave2++;
    } else {
        let res1: number = checkReport(report.filter((_, i) => i !== index));
        let res2: number = checkReport(report.filter((_, i) => i !== index + 1));
        let res3: number = checkReport(report.filter((_, i) => i !== 0));

        if (res1 === -1 || res2 === -1 || res3 === -1) {
            numOfSave2++;
        }
    }
}

console.log("ex2: ", numOfSave2);