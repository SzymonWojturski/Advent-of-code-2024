import * as fs from 'fs';
import {fdatasync} from "node:fs";

function parseInput(filename: string): [[number, number], [number, number]][] {
    const regex = /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/;
    let positions: [[number, number], [number, number]][] = [];
    for (let line of fs.readFileSync(filename, 'utf-8').split("\r\n")) {
        const match: RegExpMatchArray = line.match(regex)!;
        positions.push([[parseInt(match[1], 10), parseInt(match[2], 10)], [parseInt(match[3], 10), parseInt(match[4], 10)]])
    }
    return positions
}

function printGivenMatrix(matrix: string[][]): void {
    // Iterujemy przez wiersze tablicy i drukujemy każdy z nich
    matrix.forEach(row => console.log(row.join(" ")));
}

function ex1(data: [[number, number], [number, number]][]): number {
    let quadrants: number[] = [0, 0, 0, 0]
    let positionX: number = 0
    let positionY: number = 0
    for (let line of data) {
        let ax: number = line[0][0] + 100 * line[1][0]
        let ay: number = line[0][1] + 100 * line[1][1]
        let finalY = ((ay % 103) + 103) % 103
        let finalX = ((ax % 101) + 101) % 101
        // console.log(,)
        if (finalY < 51 && finalX < 50) {
            quadrants[0]++
        } else if (finalY < 51 && finalX > 50) {
            quadrants[1]++
        } else if (finalY > 51 && finalX < 50) {
            quadrants[2]++
        } else if (finalY > 51 && finalX > 50) {
            quadrants[3]++
        }
    }

    return quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]
}
function countNeighborsOnlyIdentical(matrix: string[][], target: string): number {
    const rows = matrix.length;
    const cols = matrix[0]?.length || 0;

    let count = 0;

    // Przechodzimy po całej macierzy
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Sprawdzamy tylko, czy dany element to 'target'
            if (matrix[i][j] === target) {
                // Sprawdzamy sąsiadów w czterech kierunkach
                const top = i > 0 ? matrix[i - 1][j] === target : true;
                const bottom = i < rows - 1 ? matrix[i + 1][j] === target : true;
                const left = j > 0 ? matrix[i][j - 1] === target : true;
                const right = j < cols - 1 ? matrix[i][j + 1] === target : true;

                // Jeśli wszyscy sąsiedzi są identyczni, zliczamy ten przypadek
                if (top && bottom && left && right) {
                    count++;
                }
            }
        }
    }

    return count;
}

function ex2(data: [[number, number], [number, number]][]): void {
    for (let i = 0; i < 1000000; i++) {
        const state: string[][] = Array.from({ length:103}, () =>
            Array.from({ length: 101 }, () => ".")
        );
        // printGivenMatrix(state)
        for (let line of data) {
            let ax: number = line[0][0] + i * line[1][0]
            let ay: number = line[0][1] + i * line[1][1]
            let finalY = ((ay % 103) + 103) % 103
            let finalX = ((ax % 101) + 101) % 101
            // console.log(,)
            if (state[finalY][finalX]==="."){
                state[finalY][finalX]="O"
            }
        }
        if(i%10000===0){
            console.log(i)
        }
        if(countNeighborsOnlyIdentical(state,"O")>100 ){
            console.log(i,"\\/")
            printGivenMatrix(state)
            console.log(i,"/\\")
            console.log()
        }


    }
}


let data: [[number, number], [number, number]][] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data));
// let preparedData: string[][] = prepareData(data)
// console.log(preparedData)
console.log("ex2: ", ex2(data));