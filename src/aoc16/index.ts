import * as fs from 'fs';
import {PriorityQueue} from './PriorityQueue';
import {finished} from "node:stream";

function parseInput(filename: string): string[][] {
    return fs.readFileSync(filename, 'utf-8').split("\r\n").map((line) => line.split(""))
}

function printGivenMatrix(matrix: string[][]): void {
    matrix.forEach(row => console.log(row.join(" ")));
}

function makeGraph(data: string[][]): [[number, number], number][][][] {
    const [n, m]: [number, number] = [data.length, data[0].length]
    let dist: [[number, number], number][][][] = []
    for (let i: number = 0; i < n * 4; i++) {
        dist.push([])
        for (let j: number = 0; j < m; j++) {
            dist[i].push([])
        }
    }
    for (let i: number = 1; i < n - 1; i++) {
        for (let j: number = 1; j < m - 1; j++) {
            if (data[i][j] !== "#") {
                dist[i][j].push([[2 * n + i, j], 1000])
                dist[i][j].push([[3 * n + i, j], 1000])

                dist[n + i][j].push([[2 * n + i, j], 1000])
                dist[n + i][j].push([[3 * n + i, j], 1000])

                dist[2 * n + i][j].push([[i, j], 1000])
                dist[2 * n + i][j].push([[n + i, j], 1000])

                dist[3 * n + i][j].push([[i, j], 1000])
                dist[3 * n + i][j].push([[n + i, j], 1000])
            }
            if (data[i][j] !== "#") {
                dist[i][j].push([[i - 1, j], 1])
            }
            if (data[i][j] !== "#") {
                dist[n + i][j].push([[n + i + 1, j], 1])
            }
            if (data[i][j] !== "#") {
                dist[2 * n + i][j].push([[2 * n + i, j + 1], 1])
            }
            if (data[i][j] !== "#") {
                dist[3 * n + i][j].push([[3 * n + i, j - 1], 1])
            }
        }
    }
    return dist
}

function ex1(data: string[][]): number {
    const [n, m]: [number, number] = [data.length, data[0].length]
    let dist: number[][] = Array.from({length: n * 4}, (): number[] => Array.from({length: m}, (): number => Infinity));
    let parent: [number, number][][] = Array.from({length: n * 4}, (): [number, number][] => Array.from({length: m}, (): [number, number] => [-1, -1]));
    let Q: PriorityQueue<[number, number]> = new PriorityQueue()
    let V: [[number, number], number][][][] = makeGraph(data)
    dist[2 * n + n - 2][1] = 0
    Q.enqueue([2 * n + n - 2, 1], 0)
    while (!Q.isEmpty()) {
        let [Ux, Uy]: [number, number] = Q.dequeue()!
        for (const [[Vx, Vy], ddist] of V[Ux][Uy]) {
            if (dist[Ux][Uy] + ddist < dist[Vx][Vy]) {
                dist[Vx][Vy] = dist[Ux][Uy] + ddist
                parent[Vx][Vy] = [Ux, Uy]
                Q.enqueue([Vx, Vy], dist[Vx][Vy])
            }
        }
    }
    let res: number = Infinity
    for (let i: number = 0; i < 4; i++) {
        if (dist[i * n + 1][m - 2] < res) {
            res = dist[i * n + 1][m - 2]
        }
    }
    return res
}

function countCharInMatrix(data: string[][], char: string): number {
    let sum:number=0;
    const [n, m]: [number, number] = [data.length, data[0].length]
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (data[i][j]===char){
                sum++
            }
        }
    }
    return sum
}

function ex2(data: string[][]): number {
    const [n, m]: [number, number] = [data.length, data[0].length]
    let dist: number[][] = Array.from({length: n * 4}, (): number[] => Array.from({length: m}, (): number => Infinity));
    let parents: [number, number][][][] = Array.from({length: n * 4}, (): [number, number][][] => Array.from({length: m}, (): [number, number][] => []));
    let Q: PriorityQueue<[number, number]> = new PriorityQueue()
    let V: [[number, number], number][][][] = makeGraph(data)
    dist[2 * n + n - 2][1] = 0
    Q.enqueue([2 * n + n - 2, 1], 0)
    while (!Q.isEmpty()) {
        let [Ux, Uy]: [number, number] = Q.dequeue()!
        for (const [[Vx, Vy], ddist] of V[Ux][Uy]) {
            if (dist[Ux][Uy] + ddist < dist[Vx][Vy]) {
                dist[Vx][Vy] = dist[Ux][Uy] + ddist
                parents[Vx][Vy] = [[Ux, Uy]]
                Q.enqueue([Vx, Vy], dist[Vx][Vy])
            } else if (dist[Ux][Uy] + ddist === dist[Vx][Vy]) {
                parents[Vx][Vy].push([Ux, Uy])
            }
        }
    }


    let res: number = Infinity
    let last: [number, number] = [-1, -1]
    for (let i: number = 0; i < 4; i++) {
        if (dist[i * n + 1][m - 2] < res) {
            res = dist[i * n + 1][m - 2]
            last = [i * n + 1, m - 2]
        }
    }
    Q.enqueue(last, 0)
    while (!Q.isEmpty()) {
        let [Ux, Uy]: [number, number] = Q.dequeue()!
        data[Ux % n][Uy] = "O"
        for (const [Px, Py] of parents[Ux][Uy]) {
            Q.enqueue([Px, Py], 0)
        }
    }

    return countCharInMatrix(data,"O")
}

let data: string[][] = parseInput("./data3.txt")
console.log("ex1: ", ex1(data));
console.log("ex2: ", ex2(data));
