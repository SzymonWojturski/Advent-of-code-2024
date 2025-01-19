import * as fs from 'fs';
import {isNumberObject} from "node:util/types";

function parseInput(filename: string): number[] {
    return fs.readFileSync(filename, 'utf-8').split("").map((x: string): number => parseInt(x))
}

function prepareData(data: number[]): any {
    data.map((val: number, index: number) => [])
    let cumulativeData: number[] = [];
    data.reduce((sum, value) => {
        sum += value;
        cumulativeData.push(sum);
        return sum;
    }, 0)

    let dots: boolean = false
    return cumulativeData.map((val, index) => [!(index % 2) ? Math.floor(index / 2) : -1, cumulativeData[index - 1] ?? 0, val])
}

function insertBlockIntoIndex(leftBlockIndex: number, rightBlockIndex: number, data: [number, number, number][]): void {
    if (data[rightBlockIndex][2] - data[rightBlockIndex][1] === data[leftBlockIndex][2] - data[leftBlockIndex][1]) {
        //editing
        data[leftBlockIndex][0]=data[rightBlockIndex][0]
        data[rightBlockIndex][0]=-1
    } else {
        //copying block
        // let ingredientsList = ;
        let insetredBlock: [number, number, number] =JSON.parse(JSON.stringify(data[rightBlockIndex]))
        //editing
        data[rightBlockIndex][0]=-1
        insetredBlock[2] = insetredBlock[2] - insetredBlock[1] + data[leftBlockIndex][1]
        insetredBlock[1] = data[leftBlockIndex][1]
        data[leftBlockIndex][1] = insetredBlock[2]
        //inserting
        data.splice(leftBlockIndex, 0, insetredBlock)
    }
}

function ex1(data: number[]): number {
    let cumulativeData: number[] = [];
    data.reduce((sum, value) => {
        sum += value;
        cumulativeData.push(sum);
        return sum;
    }, 0);
    // console.log(cumulativeData)
    let sum: number = 0;
    let i: number = 0
    let dataI: number = 0
    let dataJ: number = data.length - 1
    let j: number = data.reduce((acc: number, x: number): number => acc += x) - 1
    let files: boolean = true
    // console.log(data.length)

    while (i <= j) {
        // console.log(i,j)
        while (i >= cumulativeData[dataI]) {
            dataI++
            files = !files
        }
        while (cumulativeData[dataJ - 1] > j) {
            dataJ -= 2
            // console.log("dataJ-=2 ",dataJ)
            while (j >= cumulativeData[dataJ]) {
                j--
                // console.log("tutaj j-- ",j)
            }
            // console.log("dataJ ",dataJ)
        }
        if (files) {
            sum += i * (dataI / 2)
            // console.log(i * (dataI / 2))
            // console.log("i: %d, j: %d",i,j)

            // console.log( i * dataI / 2," = ", i ," * ", dataI/2)
        } else {
            sum += i * Math.floor(dataJ / 2)
            // console.log("i: %d, j: %d",i,j)
            // console.log( i * Math.floor(dataJ / 2)," = ", i ," * ", Math.floor(dataJ / 2))
            j--
            // console.log("j-- ",j)
        }
        i++


    }

    return sum
}

function ex2(unpreparedData: number[]): number {
    let data: [number, number, number][] = prepareData(unpreparedData)

    // console.log(data)
    let j: number = data.length - 1

    // let breaker=80
    while (j  > 0) {

        if (data[j][0] !== -1) {
            let blockSize: number = data[j][2] - data[j][1]

            for (let i: number = 0; i < j; i++) {
                if (data[i][0] === -1 && (data[i][2] - data[i][1]) >= blockSize) {
                    insertBlockIntoIndex(i, j, data)
                    j = data.length
                    // console.log(data)
                    break
                }
            }
        }


        j--
    }

    for(let block of data){
        if (block[0]===-1)
            block[0]=0
    }

    let sum:number=0
    for(let block of data){
        for(let i:number=block[1];i<block[2];i++){
            sum+=i*block[0]
        }
    }

    return sum
}

let data: number[] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data));
let data2: number[] = parseInput("./data1.txt")
console.log("ex2: ", ex2(data2));