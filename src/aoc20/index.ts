import * as fs from 'fs';
import Queue from "queue-fifo";

function parseInput(filename: string): string[][] {
    return fs.readFileSync(filename, 'utf-8').trim().split('\r\n').map((line) => line.split(""));
}

function findCoordinatesInMatrix(char: string, matrix: string[][]): [number, number] {
    for (let i: number = 0; i < matrix.length; i++) {
        for (let j: number = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === char) {
                return [i, j]
            }
        }
    }
    return [-1, -1]
}

function BFS(data: string[][], n: number, m: number, startChar: string, endChar: string): [number, number[][]] {
    let Q: Queue<[number, number]> = new Queue<[number, number]>();
    let neiPairs: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    let visited: boolean[][] = Array.from({length: n}, (): boolean[] => Array.from({length: m}, (): boolean => false));
    let dist: number[][] = Array.from({length: n}, (): number[] => Array.from({length: m}, (): number => Infinity));
    let [startingX, startingY]: [number, number] = findCoordinatesInMatrix(startChar, data)
    let [finalX, finalY]: [number, number] = findCoordinatesInMatrix(endChar, data)
    //init
    visited[startingX][startingY] = true
    dist[startingX][startingY] = 0
    Q.enqueue([startingX, startingY])
    //loop
    while (!Q.isEmpty()) {
        const [Ux, Uy]: [number, number] = Q.dequeue()!
        for (const [dx, dy] of neiPairs) {
            if (data[Ux + dx][Uy + dy] !== "#" && !visited[Ux + dx][Uy + dy]) {
                visited[Ux + dx][Uy + dy] = true
                dist[Ux + dx][Uy + dy] = dist[Ux][Uy] + 1
                Q.enqueue([Ux + dx, Uy + dy])
            }
        }
    }
    return [dist[finalX][finalY], dist]
}

function ex(data: string[][], threshold: number, maxCheatingTime: number): number {
    const [n, m]: [number, number] = [data.length, data[0].length]
    const [legitDist, distFromStart]: [number, number[][]] = BFS(data, n, m, "S", "E")
    const distFromEnd: number[][] = BFS(data, n, m, "E", "S")[1]

    let sum: number = 0
    // printGivenMatrix(dist)

    for (let i: number = 1; i < data.length - 1; i++) {
        for (let j: number = 1; j < data[0].length - 1; j++) {
            // console.log(i, j)
            for (let k: number = 1; k < data.length - 1; k++) {
                for (let l: number = 1; l < data[0].length - 1; l++) {

                    if (Math.abs(i - k) + Math.abs(j - l) <= maxCheatingTime &&
                        distFromStart[i][j] + Math.abs(i - k) + Math.abs(j - l) + distFromEnd[k][l] <= legitDist - threshold
                    ) {
                        sum++
                    }


                }
            }

        }
    }
    return sum
}

let data: string[][] = parseInput("./data2.txt")
console.log("ex1: ", ex(data, 100, 2));
console.log("ex2: ", ex(data, 100, 20));