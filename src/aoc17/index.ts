import * as fs from 'fs';
import {start} from "node:repl";

function parseInput(filename: string): [number, number, number, number[]] {
    const registersRegex = /Register A: (\d+)\s+Register B: (\d+)\s+Register C: (\d+)\s+Program: ([\d,]+)/;
    const input: string = fs.readFileSync(filename, 'utf-8')
    const registersMatch: RegExpMatchArray = input.match(registersRegex)!;
    return [parseInt(registersMatch[1], 10), parseInt(registersMatch[2], 10), parseInt(registersMatch[3], 10), registersMatch[4].split(",").map(num => parseInt(num, 10))]
}

function combo([A, B, C, program]: [number, number, number, number[]], operand: number): number {
    switch (operand) {
        case 7:
            return Infinity
        case 6:
            return C
        case 5:
            return B
        case 4:
            return A
        default:
            return operand
    }
}


function ex1([A, B, C, program]: [number, number, number, number[]]): number[] {
    let out: number[] = []
    for (let i: number = 0; i < program.length; i += 2) {
        let [instruction, operand]: [number, number] = [program[i], program[i + 1]]
        switch (instruction) {
            case 0: {//adv
                A = Math.floor(A / (2 ** combo([A, B, C, program], operand)))
                break
            }
            case 1: {//bxl
                B = B ^ operand
                break
            }
            case 2: {//bst
                B = ((combo([A, B, C, program], operand) % 8)+8)%8
                break
            }
            case 3: {//jnz
                if (A !== 0) {
                    i = operand - 2
                }
                break
            }
            case 4: {//bxc
                B = B ^ C
                break
            }
            case 5: {//out
                out.push(((combo([A, B, C, program], operand) % 8)+8)%8)
                break
            }
            case 6: {//bdv
                B = Math.floor(A / (2 ** combo([A, B, C, program], operand)))
                break
            }
            case 7: {//cdv
                C = Math.floor(A / (2 ** combo([A, B, C, program], operand)))
                break
            }


        }
    }
    return out
}

function arraysEqual(arr1: number[], arr2: number[]) {
    if (arr1.length !== arr2.length) {
        return false; // Jeśli różnią się długościami, są różne
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false; // Jeśli różnią się elementy, są różne
        }
    }
    return true; // Tablice są identyczne
}

function ex2([A, B, C, program]: [number, number, number, number[]]) {
    let oldCandidates: number[] = [0];
    let newCandidates: number[] = [];
    for (let i: number = 0; i < 16; i++) {
        for(let candidate of oldCandidates){

            for (let j: number = 0; j < 8; j++) {
                if (arraysEqual(program.slice(15-i),ex1([j  + candidate*8, B, C, program]))) {
                    newCandidates.push(j  + candidate*8)
                }
            }
        }
        oldCandidates=newCandidates
        newCandidates=[]
    }
    let res:number=Infinity
    for(let candidate of oldCandidates){
        if (candidate<res){
            res=candidate
        }
    }
    return res
}


let data: [number, number, number, number[]] = parseInput("./data2.txt")
// console.log(data)
console.log("ex1: ", ex1(data).toString());
console.log("ex2: ", ex2(data));
