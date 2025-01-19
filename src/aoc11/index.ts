import * as fs from 'fs';

function parseInput(filename: string): string[] {
    return fs.readFileSync(filename, 'utf-8').split(" ")
}

function handleOddEx1(item: string, stack: string[]): void {
    stack.push((parseInt(item) * 2024).toString())
}

function handleEvenEx1(item: string, stack: string[]): void {
    let n: number = item.length
    stack.push((parseInt(item.slice(0, n / 2))).toString())
    stack.push((parseInt(item.slice(n / 2, n))).toString())
}

function ex1(readStack: string[], cycles: number): number {
    let writeStack: string[] = []

    for (let i: number = 0; i < cycles; i++) {
        // console.log(i)
        while (readStack.length > 0) {
            let item: string = readStack.pop()!
            if (item === "0") {
                writeStack.push("1")
            }
            if (item.length % 2 === 1 && item !== "0") {
                handleOddEx1(item, writeStack)
            }

            if (item.length % 2 === 0) {
                handleEvenEx1(item, writeStack)
            }
        }
        readStack = writeStack
        writeStack = []
    }


    return readStack.length
}

function recursiveFind(value: string, valuesMap: Map<string, number>, cycles: string): number {
    // console.log(value, cycles)
    if (valuesMap.has(value+" "+ cycles)) {
        return valuesMap.get(value+" "+ cycles)!
    }

    if (cycles === "0") {
        valuesMap.set(value+" "+ cycles, 1)
        return valuesMap.get(value+" "+ cycles)!
    }

    if (value === "0") {
        valuesMap.set(value+" "+ cycles, recursiveFind("1", valuesMap, (parseInt(cycles) - 1).toString()))
        return valuesMap.get(value+" "+ cycles)!
    }
    let n: number = value.length;
    if (n % 2 === 0) {
        let firstHalf: string = parseInt(value.slice(0, n / 2)).toString()
        let secondHalf: string = parseInt(value.slice(n / 2, n)).toString()
        let firstVal:number= recursiveFind(firstHalf, valuesMap, (parseInt(cycles) - 1).toString())
        let secondVal:number= recursiveFind(secondHalf, valuesMap,(parseInt(cycles) - 1).toString())
        valuesMap.set(value+" "+ cycles,firstVal+ secondVal)
        return valuesMap.get(value+" "+ cycles)!
    }
    if (n % 2 === 1) {
        valuesMap.set(value+" "+ cycles, recursiveFind((parseInt(value) * 2024).toString(), valuesMap, (parseInt(cycles) - 1).toString()))

        return valuesMap.get(value+" "+ cycles)!
    }

    console.log("ERROR", value, cycles, valuesMap)
    return parseInt("skibidi")
}

function ex2(data: string[], cycles: string): number {
    let sum: number = 0
    let valuesMap: Map<string, number> = new Map<string, number>()
    for (const val of data) {
        sum+=recursiveFind(val, valuesMap, cycles)
    }
    return sum

}


let data: string[] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data, 25));

let data2: string[] = parseInput("./data2.txt")
console.log("ex2: ", ex2(data2, "75"));

