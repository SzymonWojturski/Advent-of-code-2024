import * as fs from 'fs';
import Queue from "queue-fifo";

function parseInput(filename: string): string[] {
    return fs.readFileSync(filename, 'utf-8').trim().split('\r\n');
}

function makeNumericKeypad(): string[][] {
    let keypad: string[][] = []
    for (let i: number = 0; i < 3; i++) {
        keypad.push([])
        for (let j: number = 1; j < 4; j++) {
            keypad[i].push((((2 - i) * 3) + j).toString())
        }
    }
    return keypad
}

function makeDirectionalKeypad(): string[][] {
    return [["", "^", "A"], ["<", "^", ">"]]
}

function from1to2([x1, y1]: [number, number], [x2, y2]: [number, number]) {
    let vertical: string = ""
    let horizontal: string = ""
    if (x2 - x1 > 0) {
        vertical = "v".repeat(Math.abs(x2 - x1))
    } else if (x2 - x1 < 0) {
        vertical = "^".repeat(Math.abs(x2 - x1))
    }

    if (y2 - y1 > 0) {
        horizontal = ">".repeat(Math.abs(y2 - y1))
    } else if (y2 - y1 < 0) {
        horizontal = "<".repeat(Math.abs(y2 - y1))
    }
    if (horizontal !== "" && vertical !== "") {
        return [horizontal + vertical, vertical + horizontal]
    } else if (horizontal !== "") {
        return [horizontal]
    } else {
        return [vertical]
    }
}

function translateNumericToDirectional([x1, y1]: [number, number], [x2, y2]: [number, number]){
    
}

let data: string[] = parseInput("./data1.txt")
// console.log(data)
makeNumericKeypad()
// console.log("ex1: ", ex(data, 100, 2));
// console.log("ex2: ", ex(data, 100, 20));

console.log(from1to2([4, 0], [0, 2]))
console.log(from1to2([4, 0], [4, 3]))
console.log(from1to2([0, 2], [3, 2]))