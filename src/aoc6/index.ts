import * as fs from 'fs';

function parseInput(filename: string): string[][] {
    return fs.readFileSync(filename, 'utf-8').split("\r\n").map((str: string): string[] => str.split(""));
}

function printMatrix(matrix: string[][]): void {
    matrix.forEach(line => {
        console.log(line.join("\t"));
    });
    console.log("==================================================================")
    console.log()
}

function prepareWalking(data: string[][]): [number, number][] {
    const stepMap: Map<string, [number, number]> = new Map(
        [
            ["^", [-1, 0]],
            [">", [0, 1]],
            ["<", [0, -1]],
            ["v", [1, 0]]
        ])
    let currentCoordinates: [number, number] = [-1, -1]
    let step: [number, number] = [0, 0]
    outerFor:for (let i: number = 0; i < data.length; i++) {
        for (let j: number = 0; j < data[i].length; j++) {
            if (stepMap.has(data[i][j])) {
                currentCoordinates = [i, j]
                step = stepMap.get(data[i][j]) ?? [0, 0]
                break outerFor
            }
        }
    }
    return [currentCoordinates, step]
}

function walkTillWall(data: string[][]) {
    let currentCoordinates: [number, number]
    let step: [number, number]
    let input: [number, number][] = prepareWalking(data)
    currentCoordinates = input[0];
    step = input[1];
    let n: number = data.length
    let m: number = data[0].length

    let tmp = data[currentCoordinates[0]][currentCoordinates[1]]
    data[currentCoordinates[0]][currentCoordinates[1]] = "X"


    let nextStep: [number, number] = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
    let canMakeNextStep: boolean = 0 < nextStep[0] && nextStep[0] < n && 0 < nextStep[1] && nextStep[1] < m
    while (canMakeNextStep) {
        currentCoordinates = nextStep
        data[nextStep[0]][nextStep[1]] = "X"

        nextStep = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
        canMakeNextStep = 0 < nextStep[0] && nextStep[0] < n && 0 < nextStep[1] && nextStep[1] < m && data[nextStep[0]][nextStep[1]] !== "#"
    }
    const directionMap: Map<string, string> = new Map(
        [
            ["^", ">"],
            [">", "v"],
            ["v", "<"],
            ["<", "^"]
        ])
    data[currentCoordinates[0]][currentCoordinates[1]] = directionMap.get(tmp) ?? "error"
}

function ex1(data: string[][], di: number, dj: any): number {
    let data2: string[][] = JSON.parse(JSON.stringify(data))
    const nextDirectionMap: Map<string, string> = new Map(
        [
            ["^", ">"],
            [">", "v"],
            ["v", "<"],
            ["<", "^"]
        ])
    const stepMap: Map<string, [number, number]> = new Map(
        [
            ["^", [-1, 0]],
            [">", [0, 1]],
            ["<", [0, -1]],
            ["v", [1, 0]]
        ])
    let currentCoordinates: [number, number]
    let step: [number, number]
    let input: [number, number][] = prepareWalking(data)
    currentCoordinates = input[0];
    step = input[1];
    let n: number = data.length
    let m: number = data[0].length
    let startingStep = input[1]
    let currentFacing: string = data[currentCoordinates[0]][currentCoordinates[1]]

    let nextStep: [number, number] = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
    while (true) {


        console.log(currentCoordinates)
        if (0 < nextStep[0] && nextStep[0] < n && 0 < nextStep[1] && nextStep[1] < m && data[nextStep[0]][nextStep[1]] !== "#") {
            // data[currentCoordinates[0]][currentCoordinates[1]] = "X"
            // data[nextStep[0]][nextStep[1]] = currentFacing
            currentCoordinates = nextStep
            nextStep = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
        }
        if (prepareWalking(data)[0][0] === 0 || prepareWalking(data)[0][0] === n - 1 || prepareWalking(data)[0][1] === 0 || prepareWalking(data)[0][1] === m - 1) {
            return 0
        }
        if (data[nextStep[0]][nextStep[1]] === "#") {

            // console.log("siema")
            if (data[currentCoordinates[0]][currentCoordinates[1]] === "42") {
                return 1
            }
            if (nextStep[0] == di && nextStep[1] == dj) {
                data[currentCoordinates[0]][currentCoordinates[1]] = "42"
            }
            currentFacing = nextDirectionMap.get(currentFacing) ?? "s"
            step = stepMap.get(currentFacing) ?? [1, 1]
            nextStep = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]

            // data[currentCoordinates[0]][currentCoordinates[1]] = nextDirectionMap.get(currentFacing) ?? "error"
        }


        // return ex1(data, x)
    }
}

function ex1copy(data: string[][], x: number): boolean {
    while (true) {
        let data2: string[][] = JSON.parse(JSON.stringify(data))
        const nextDirectionMap: Map<string, string> = new Map(
            [
                ["^", ">"],
                [">", "v"],
                ["v", "<"],
                ["<", "^"]
            ])

        let currentCoordinates: [number, number]
        let step: [number, number]
        let input: [number, number][] = prepareWalking(data)
        currentCoordinates = input[0];
        step = input[1];
        let n: number = data.length
        let m: number = data[0].length

        let currentFacing: string = data[currentCoordinates[0]][currentCoordinates[1]]

        let nextStep: [number, number] = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]

        if (0 < nextStep[0] && nextStep[0] < n && 0 < nextStep[1] && nextStep[1] < m && data[nextStep[0]][nextStep[1]] !== "#") {
            data[nextStep[0]][nextStep[1]] = currentFacing
        } else if (data[nextStep[0]][nextStep[1]] === "#") {
            data[currentCoordinates[0]][currentCoordinates[1]] = nextDirectionMap.get(currentFacing) ?? "error"
        }

        if (prepareWalking(data)[0][0] === 0 || prepareWalking(data)[0][0] === n - 1 || prepareWalking(data)[0][1] === 0 || prepareWalking(data)[0][1] === m - 1) {
            return false
        }
        // return ex1(data, x)
    }
}

// function checkLoop(data: string[][], x: number): number {
//     let data2: string[][] = JSON.parse(JSON.stringify(data))
//     let y: number = 0
//     const nextDirectionMap: Map<string, string> = new Map(
//         [
//             ["^", ">"],
//             [">", "v"],
//             ["v", "<"],
//             ["<", "^"]
//         ])
//     const stepMap: Map<string, [number, number]> = new Map(
//         [
//             ["^", [-1, 0]],
//             [">", [0, 1]],
//             ["<", [0, -1]],
//             ["v", [1, 0]]
//         ])
//
//     let currentCoordinates: [number, number]
//     let step: [number, number]
//     let input: [number, number][] = prepareWalking(data)
//     currentCoordinates = input[0];
//     step = input[1];
//     let n: number = data.length
//     let m: number = data[0].length
//     let currentFacing: string = data[currentCoordinates[0]][currentCoordinates[1]]
//
//     let nextStep: [number, number] = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
//
//     data[currentCoordinates[0]][currentCoordinates[1]] = "42"
//     data[nextStep[0]][nextStep[1]] = currentFacing
//
//     while (true) {
//         y++
//         // x++
//         // if(x===3) {
//         //     printMatrix(data)
//         //     console.log(nextStep, n, m,x,currentFacing,y)
//         // }
//         if (nextStep[0] === -1 || nextStep[0] === n || nextStep[1] === -1 || nextStep[1] === m) {
//             return 0
//         } else if (data[nextStep[0]][nextStep[1]] === "42" && y > 10000000) {
//             return 1
//         } else if (data[nextStep[0]][nextStep[1]] === "#") {
//             currentFacing = nextDirectionMap.get(currentFacing) ?? "error"
//             step = stepMap.get(currentFacing) ?? [0, 0]
//             nextStep = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
//
//         } else {
//             if (data[currentCoordinates[0]][currentCoordinates[1]] !== "42") {
//                 data[currentCoordinates[0]][currentCoordinates[1]] = "X"
//             }
//             currentCoordinates = nextStep
//             nextStep = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]
//             if (data[currentCoordinates[0]][currentCoordinates[1]] !== "42") {
//                 data[currentCoordinates[0]][currentCoordinates[1]] = currentFacing
//             }
//
//         }
//     }
// }

function ex2(data: string[][], x: number): number {
    let posiible = []

    let n: number = data.length
    let m: number = data[0].length
    let starting = prepareWalking(data)[0]
    janiemoge:while (true) {
        let data2: string[][] = JSON.parse(JSON.stringify(data))
        const nextDirectionMap: Map<string, string> = new Map(
            [
                ["^", ">"],
                [">", "v"],
                ["v", "<"],
                ["<", "^"]
            ])

        let currentCoordinates: [number, number]
        let step: [number, number]
        let input: [number, number][] = prepareWalking(data)
        currentCoordinates = input[0];
        step = input[1];
        let n: number = data.length
        let m: number = data[0].length

        let currentFacing: string = data[currentCoordinates[0]][currentCoordinates[1]]

        let nextStep: [number, number] = [currentCoordinates[0] + step[0], currentCoordinates[1] + step[1]]

        if (0 < nextStep[0] && nextStep[0] < n && 0 < nextStep[1] && nextStep[1] < m && data[nextStep[0]][nextStep[1]] !== "#") {
            data[currentCoordinates[0]][currentCoordinates[1]] = "X"
            data[nextStep[0]][nextStep[1]] = currentFacing
        } else if (data[nextStep[0]][nextStep[1]] === "#") {
            data[currentCoordinates[0]][currentCoordinates[1]] = nextDirectionMap.get(currentFacing) ?? "error"
        }

        // console.log(currentCoordinates)
        // printMatrix(data)
        if (prepareWalking(data)[0][0] === 0 || prepareWalking(data)[0][0] === n - 1 || prepareWalking(data)[0][1] === 0 || prepareWalking(data)[0][1] === m - 1) {
            // posiible.push(prepareWalking(data)[0])
            // console.log(currentCoordinates)
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < m; j++) {
                    // if (data[i][j] === "X" && i !== starting[0] && j !== starting[1]) {
                    //     posiible.push([i, j])
                    //     console.log(posiible)
                    // }
                    if ( i !== starting[0] || j !== starting[1]) {
                        posiible.push([i, j])
                        // console.log(posiible)
                    }
                }

            }
            break janiemoge
        }
    }
    let sum = 0;
    let xd = 0
    for (let position of posiible) {
        xd++
        let data3 = parseInput("./data2.txt")
        data3[position[0]][position[1]] = "#"
        // console.log(xd)
        if (ex3(data3, position[0], position[1])==1){
            sum +=1

            console.log(position)
        }

    }
    return sum
}

function ex3(data: string[][], xd1: number, xd2: number) {
    const nextDirectionMap: Map<string, string> = new Map(
        [
            ["^", ">"],
            [">", "v"],
            ["v", "<"],
            ["<", "^"]
        ])
    const stepMap: Map<string, [number, number]> = new Map(
        [
            ["^", [-1, 0]],
            [">", [0, 1]],
            ["<", [0, -1]],
            ["v", [1, 0]]
        ])

    let n: number = data.length
    let m: number = data[0].length
    let currentPosition = prepareWalking(data)[0]
    let currnetStep = prepareWalking(data)[1]
    let currentFacing = data[currentPosition[0]][currentPosition[1]]
    let nextStep:[number,number]=[currentPosition[0] , currentPosition[1]]
    // return [currentCoordinates, step]
    let steps = 0;
    // console.log(steps < m * n)
    while (steps < (m * n)+1) {
        steps++


        if (xd1 === 7 && xd2 === 8) {
            // console.log()
            // console.log(0 > nextStep[0])
            // console.log(nextStep[0] >= n)
            // console.log(0 > nextStep[1])
            // console.log(nextStep[1] >= m)
            // console.log(nextStep)
            // printMatrix(data)
        }


        if (0 > nextStep[0] || nextStep[0] >= n || 0 > nextStep[1] || nextStep[1] >= m) {

            return 0
        }
        if (data[nextStep[0]][nextStep[1]] === "#") {
            currentFacing = nextDirectionMap.get(currentFacing) ?? "xd"
            currnetStep = stepMap.get(currentFacing)??[0,0]

            nextStep = [currentPosition[0] + currnetStep[0], currentPosition[1] + currnetStep[1]]
        } else {
            data[currentPosition[0]][currentPosition[1]]="X"
            currentPosition=nextStep
            nextStep = [currentPosition[0] + currnetStep[0], currentPosition[1] + currnetStep[1]]

        }
    }
    return 1
}

// let data: string[][] = parseInput("./data2.txt")
// console.log("ex1: ", ex1(data, 0));
let data2: string[][] = parseInput("./data2.txt")
console.log("ex2: ", ex2(data2, 0));