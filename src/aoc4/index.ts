import * as fs from 'fs';

function parseInput(filename: string): string[] {
    return fs.readFileSync(filename, 'utf-8').split("\r\n");
}


function ex1(words: string[]): number {
    let sum: number = 0;
    const n: number = words.length

    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < n; j++) {
            if (i < n - 3 && words[i][j] == "X" && words[i + 1][j] == "M" && words[i + 2][j] == "A" && words[i + 3][j] == "S") {
                sum++
            }
            if (i < n - 3 && words[i][j] == "S" && words[i + 1][j] == "A" && words[i + 2][j] == "M" && words[i + 3][j] == "X") {
                sum++
            }
        }
    }
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < n; j++) {
            if (j < n - 3 && words[i][j] == "X" && words[i][j + 1] == "M" && words[i][j + 2] == "A" && words[i][j + 3] == "S") {
                sum++
            }
            if (j < n - 3 && words[i][j] == "S" && words[i][j + 1] == "A" && words[i][j + 2] == "M" && words[i][j + 3] == "X") {
                sum++
            }
        }
    }

    for (let i: number = 0; i < n - 3; i++) {
        for (let j: number = 0; j < n - 3; j++) {
            if (words[i][j] == "X" && words[i + 1][j + 1] == "M" && words[i + 2][j + 2] == "A" && words[i + 3][j + 3] == "S") {
                sum++
            }
            if (words[i][j] == "S" && words[i + 1][j + 1] == "A" && words[i + 2][j + 2] == "M" && words[i + 3][j + 3] == "X") {
                sum++
            }
        }
    }
    for (let i: number = 3; i < n; i++) {
        for (let j: number = 0; j < n - 3; j++) {
            if (words[i][j] == "X" && words[i - 1][j + 1] == "M" && words[i - 2][j + 2] == "A" && words[i - 3][j + 3] == "S") {
                sum++
            }
            if (words[i][j] == "S" && words[i - 1][j + 1] == "A" && words[i - 2][j + 2] == "M" && words[i - 3][j + 3] == "X") {
                sum++
            }
        }
    }
    return sum
}

function ex2(words: string[]): number {
    let sum = 0;
    const n: number = words.length
    const multiplicators: [number, number, number, number][] = [[1, 1, -1, -1], [1, -1, -1, 1], [-1, -1, 1, 1], [-1, 1, 1, -1]]
    for (let i: number = 1; i < n - 1; i++) {
        for (let j: number = 1; j < n - 1; j++) {
            for (const mul of multiplicators) {
                if (words[i][j] == "A" &&
                    words[i + mul[0]][j + mul[1]] == "M" && words[i + mul[1]][j + mul[2]] == "M" &&
                    words[i + mul[2]][j + mul[3]] == "S" && words[i + mul[3]][j + mul[0]] == "S") {
                    sum++
                }
            }
        }
    }

    return sum
}

const data: string[] = parseInput("./data2.txt")

console.log("ex1: " + ex1(data))
console.log("ex2: " + ex2(data))