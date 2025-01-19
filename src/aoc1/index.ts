import * as fs from 'fs';

const words: string = fs.readFileSync('./aoc1/data.txt', 'utf-8');
const wordList: string[] = words.split('\r\n');


let left: number[] = [];
let right: number[] = [];

wordList.forEach((word: string) => {
    let line: string[] = word.split(' ');
    left.push(parseInt(line[0]));
    right.push(parseInt(line[3]));
});

let n: number = left.length;

left.sort((a: number, b: number) => a - b);
right.sort((a: number, b: number) => a - b);

const sum: number = left.reduce((acc, leftValue, i) => acc + Math.abs(leftValue - right[i]), 0);

console.log("ex1: ", sum);

const rightFrequency: Map<number, number> = new Map<number, number>();


right.forEach((rightNumber: number) => {
    rightFrequency.set(rightNumber, (rightFrequency.get(rightNumber) ?? 0) + 1);
});

const sum2: number = left.reduce((acc, leftValue) => acc + leftValue * (rightFrequency.get(leftValue) ?? 0), 0);

console.log("ex2: ", sum2);