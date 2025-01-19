import * as fs from 'fs';
import {fdatasync} from "node:fs";

function parseInput(filename: string): string[][] {
    return fs.readFileSync(filename, 'utf-8').split("\r\n").map((x) => x.split(""))
}

function prepareData(data: string[][]): string[][] {
    let redundant: string[] = data[0].map((x: string): string => "?").concat(["?", "?",])
    // let data2:string[][]=data.map((line:string[]):string[]=>["?"].concat(line,["?"]))
    // console.log(data2)
    // console.log(tmp)
    return [redundant].concat(data.map((line: string[]): string[] => ["?"].concat(line, ["?"])), [redundant])
}

function BFS(startX: number, startY: number, data: string[][], visited: boolean[][]): number {
    let n: number = data.length
    let m: number = data[0].length
    let Q: [number, number][] = []
    let neiPairs: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    let res: [number, number] = [0, 0]
    Q.push([startX, startY])

    visited[startX][startY] = true

    while (Q.length > 0) {
        let [Ui, Uj]: [number, number] = Q.pop()!!
        res[0]++
        // console.log(Ui,Uj,data[Ui][Uj],visited[Ui][Uj])
        for (const [di, dj] of neiPairs) {
            if (n > Ui + di && Ui + di >= 0 && m > Uj + dj && Uj + dj >= 0) {
                //jest w tablicy
                if (data[Ui][Uj] === data[Ui + di][Uj + dj]) {
                    if (!visited[Ui + di][Uj + dj]) {

                        visited[Ui + di][Uj + dj] = true
                        Q.push([Ui + di, Uj + dj])
                    }
                } else {
                    // console.log(Ui,Uj,"res++")
                    res[1]++
                }
            } else {
                // console.log(Ui,Uj,"res++")
                res[1]++
            }
        }
    }
    // console.log("koniec",res,res[0]*res[1])

    return res[0] * res[1]
}


function ex1(data: string[][]): number {
    let n: number = data.length
    let m: number = data[0].length
    let visited: boolean[][] = Array.from({length: n}, (): boolean[] => Array.from({length: m}, (): boolean => false));
    let sum: number = 0

    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (!visited[i][j]) {
                sum += BFS(i, j, data, visited)
            }
        }
    }


    return sum
}

function checkFence(data: string[][], visited: number[][], stage: number, mask: [number, number], horizontal: boolean): number {
    let sum: number = 0

    let n: number = data.length
    let m: number = data[0].length
    let checking: boolean = false

    if (horizontal) {
        for (let i: number = 0; i < n; i++) {
            for (let j: number = 0; j < m; j++) {
                if (visited[i][j] === stage && data[i + mask[0]][j + mask[1]] !== data[i][j]) {
                    if (!checking) {
                        checking = true
                    }

                } else {
                    if (checking) {
                        checking = false
                        sum++
                    }
                }
                if (visited[i][j] === stage) {
                    visited[i][j]++
                }
            }
        }
    } else {
        for (let j: number = 0; j < m; j++) {
            for (let i: number = 0; i < n; i++) {
                if (visited[i][j] === stage && data[i + mask[0]][j + mask[1]] !== data[i][j]) {
                    if (!checking) {
                        checking = true
                    }

                } else {
                    if (checking) {
                        checking = false
                        sum++
                    }
                }
                if (visited[i][j] === stage) {
                    visited[i][j]++
                }
            }
        }
    }
    return sum
}

function BFS2(startX: number, startY: number, data: string[][], visited: number[][]): number {
    let n: number = data.length
    let m: number = data[0].length
    let Q: [number, number][] = []
    let neiPairs: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    let res: number = 0
    Q.push([startX, startY])

    visited[startX][startY] = 1

    while (Q.length > 0) {
        let [Ui, Uj]: [number, number] = Q.pop()!!
        res++
        for (const [di, dj] of neiPairs) {
            if (n > Ui + di && Ui + di >= 0 && m > Uj + dj && Uj + dj >= 0 && data[Ui][Uj] === data[Ui + di][Uj + dj] && !visited[Ui + di][Uj + dj]) {
                visited[Ui + di][Uj + dj] = 1
                Q.push([Ui + di, Uj + dj])
            }
        }
    }
    return res
}

function ex2(data: string[][]): number {
    let n: number = data.length
    let m: number = data[0].length
    let visited: number[][] = Array.from({length: n}, (): number[] => Array.from({length: m}, (): number => 0));
    let sum: number = 0
    let partialArea: number = 0
    let partialSides: number = 0

    for (let i: number = 1; i < n - 1; i++) {
        for (let j: number = 1; j < m - 1; j++) {
            if (!visited[i][j]) {
                partialArea += BFS2(i, j, data, visited)
                partialSides += checkFence(data, visited, 1, [-1, 0], true)
                partialSides += checkFence(data, visited, 2, [1, 0], true)
                partialSides += checkFence(data, visited, 3, [0, -1], false)
                partialSides += checkFence(data, visited, 4, [0, 1], false)
                sum += partialArea * (partialSides)
                partialArea = 0
                partialSides = 0
            }
        }
    }

    return sum
}

let data: string[][] = parseInput("./data2.txt")
// console.log(data)
console.log("ex1: ", ex1(data));
let preparedData: string[][] = prepareData(data)
// console.log(preparedData)
console.log("ex2: ", ex2(preparedData));