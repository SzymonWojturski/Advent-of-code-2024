import * as fs from 'fs';

function parseInput(filename: string): string {
    const words: string = fs.readFileSync(filename, 'utf-8');
    return words
}

function ex1(data: string): number {
    let sum:number=0
    let pattern: RegExp = /mul\([0-9]+,[0-9]+\)/gi
    let muls: string[] = data.match(pattern) ?? []
    for (let mul of muls) {
        let ingredients:number[] = mul.slice(4, -1).split(',').map((a:string)=>parseInt(a))
        sum+=ingredients[0]*ingredients[1]
    }
    return sum
}

function ex2(data: string): number {
    let sum:number=0
    let doRe:RegExp= /do\(\)/gi
    let dontRe:RegExp= /don't\(\)/gi
    let mulRe: RegExp = /mul\([0-9]+,[0-9]+\)/gi
    let pattern: RegExp = new RegExp(
        `${doRe.source}|${dontRe.source}|${mulRe.source}`,
        "gi"
    );
    let dirtyData: string[] = data.match(pattern) ?? []
    // console.log(dirtyData)

    let canCount:boolean=true;
    for (let re of dirtyData){
        if(doRe.test(re)){
            canCount=true
        }
        else if(dontRe.test(re)){
            canCount=false
        }
        else if (canCount){
            sum+=ex1(re)
        }
    }
    return sum
}


let input:string=parseInput("./data2.txt")
console.log("ex1: "+ex1(input))
console.log("ex2: "+ex2(input))