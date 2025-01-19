import * as fs from 'fs';
import {fdatasync} from "node:fs";
import {finished} from "node:stream";

function parseInput(filename: string): [string[][], string[]] {
    let file = fs.readFileSync(filename, 'utf-8').split("\r\n\r\n")
    return [file[0].split("\r\n").map((line) => line.split("")), file[1].split("\r\n").join("").split("")]
}

function extendData(data: [string[][], string[]]): any {
    let extendedTiles: Map<string, string> = new Map([
        [".", ".."],
        ["#", "##"],
        ["@", "@."],
        ["O", "[]"]
    ])
    return [data[0].map((line: string[]) => line.flatMap((x: string) => extendedTiles.get(x)!.split(""))), data[1]]
}


function printGivenMatrix(matrix: string[][]): void {
    matrix.forEach(row => console.log(row.join(" ")));
}

function oneStep(data: string[][], direction: [number, number]): void {
    let n: number = data.length
    let m: number = data[0].length
    let [currentX, currentY, nextX, nextY]: [number, number, number, number] = [0, 0, 0, 0]
    robotFinder:for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (data[i][j] === "@") {
                currentX = i
                currentY = j
                nextX = i + direction[0]
                nextY = j + direction[1]
                break robotFinder
            }
        }
    }

    if (data[nextX][nextY] === ".") {
        data[nextX][nextY] = "@"
        data[currentX][currentY] = "."
        return
    } else if (data[nextX][nextY] === "#") {
        return;
    } else {
        let dist: number = 0;
        while (data[nextX + dist * direction[0]][nextY + dist * direction[1]] === "O") {
            dist++
        }
        if (data[nextX + dist * direction[0]][nextY + dist * direction[1]] === ".") {
            data[nextX + dist * direction[0]][nextY + dist * direction[1]] = "O"
            data[nextX][nextY] = "@"
            data[currentX][currentY] = "."
            return;
        } else {
            return;
        }
    }


}

function countBoxes(data: string[][],boxID:string="O"): number {
    let n: number = data.length
    let m: number = data[0].length
    let sum: number = 0
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (data[i][j] === boxID) {
                sum += 100 * i + j
            }
        }
    }
    return sum
}

function ex1(data: [string[][], string[]]): number {
    const stepsDirections: Map<string, [number, number]> = new Map<string, [number, number]>()
    stepsDirections.set("^", [-1, 0])
    stepsDirections.set("v", [1, 0])
    stepsDirections.set(">", [0, 1])
    stepsDirections.set("<", [0, -1])
    for (const step of data[1]) {
        oneStep(data[0], stepsDirections.get(step)!)
    }
    return countBoxes(data[0])
}

function handleHorizontalPush(data: string[][], currentX: number, currentY: number, direction: [number, number]): void {
    let nextX: number = currentX + direction[0]
    let nextY: number = currentY + direction[1]
    let dist: number = 0;
    while (data[nextX][nextY + dist * direction[1]] === "[" || data[nextX][nextY + dist * direction[1]] === "]") {
        dist++
    }
    if (data[nextX + dist * direction[0]][nextY + dist * direction[1]] === ".") {
        while (dist > 0) {
            data[nextX][nextY + dist * direction[1]] = data[nextX][nextY + (dist - 1) * direction[1]]
            dist--
        }
        data[nextX][nextY] = "@"
        data[currentX][currentY] = "."
        return;
    } else {
        return;
    }
}

function handleVerticalPush(data: string[][], currentX: number, currentY: number, direction: [number, number]): void {
    let nextX: number = currentX + direction[0]
    let nextY: number = currentY + direction[1]
    let boxesToMove:[number,number][]=[]
    let readStack:[number,number][]=[]
    let writeStack:[number,number][]=[]

    readStack.push([nextX,nextY])
    if (data[nextX][nextY]==="["){
        readStack.push([nextX,nextY+1])
    }else{
        readStack.push([nextX,nextY-1])
    }

    boxesToMove.push(...readStack)
    while (readStack.length>0){
        while (readStack.length>0){
            let currentBox:[number,number]=readStack.pop()!
            if (data[currentBox[0]+direction[0]][currentBox[1]]==="["){
                writeStack.push([currentBox[0]+direction[0],currentBox[1]])
                writeStack.push([currentBox[0]+direction[0],currentBox[1]+1])
            }else if (data[currentBox[0]+direction[0]][currentBox[1]]==="]"){
                writeStack.push([currentBox[0]+direction[0],currentBox[1]])
                writeStack.push([currentBox[0]+direction[0],currentBox[1]-1])
            }
            else if(data[currentBox[0]+direction[0]][currentBox[1]]==="#"){
                return
            }
        }
        readStack=writeStack
        writeStack=[]
        boxesToMove.push(...readStack)
    }
    //moving all boxes
    boxesToMove=Array.from( new Set(boxesToMove.map(subArray => JSON.stringify(subArray)))).map(item => JSON.parse(item));
    while (boxesToMove.length>0){
        let currentBox:[number,number]=boxesToMove.pop()!
        // console.log(currentBox)
        data[currentBox[0]+direction[0]][currentBox[1]]=data[currentBox[0]][currentBox[1]]
        data[currentBox[0]][currentBox[1]]="."
    }
    data[currentX+direction[0]][currentY]="@"
    data[currentX][currentY]="."


}

function oneStepEx2(data: string[][], direction: [number, number]): void {
    let n: number = data.length
    let m: number = data[0].length
    let [currentX, currentY, nextX, nextY]: [number, number, number, number] = [0, 0, 0, 0]
    robotFinder:for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (data[i][j] === "@") {
                currentX = i
                currentY = j
                nextX = i + direction[0]
                nextY = j + direction[1]
                break robotFinder
            }
        }
    }

    if (data[nextX][nextY] === ".") {
        data[nextX][nextY] = "@"
        data[currentX][currentY] = "."
        return
    } else if (data[nextX][nextY] === "#") {
        return;
    } else {
        if (direction[0] === 0) {
            handleHorizontalPush(data, currentX, currentY, direction)
        } else {
            handleVerticalPush(data, currentX, currentY, direction)
        }
    }
}

function ex2(data: [string[][], string[]]): number {
    const stepsDirections: Map<string, [number, number]> = new Map<string, [number, number]>()
    stepsDirections.set("^", [-1, 0])
    stepsDirections.set("v", [1, 0])
    stepsDirections.set(">", [0, 1])
    stepsDirections.set("<", [0, -1])
    for (const step of data[1]) {

        oneStepEx2(data[0], stepsDirections.get(step)!)
    }
    return countBoxes(data[0],"[")
}


let data: [string[][], string[]] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data));
let unpreparedData: [string[][], string[]] = parseInput("./data2.txt")
let preparedData: [string[][], string[]] = extendData(unpreparedData)
console.log("ex2: ", ex2(preparedData));