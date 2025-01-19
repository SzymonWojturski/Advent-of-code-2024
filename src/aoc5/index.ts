import * as fs from 'fs';

function parseInput(filename: string): [[number, number][], number[][]] {
    let step1: string[] = fs.readFileSync(filename, 'utf-8').split("\r\n\r\n");
    let rules: any = step1[0].split("\r\n")
    rules = rules.map((x: string): string[] => x.split("|"))
    rules = rules.map((x: string[]): number[] => x.map((word: string): number => parseInt(word)))

    let produce: any = step1[1].split("\r\n")
    produce = produce.map((x: string): string[] => x.split(","))
    produce = produce.map((x: string[]): number[] => x.map((word: string): number => parseInt(word)))
    return [rules, produce]
}

function makeRules(rules: [number, number][]): Map<number, Set<number>> {
    const mapOfSets: Map<number, Set<number>> = new Map();

    for (const rule of rules) {
        if (mapOfSets.has(rule[0])) {
            mapOfSets.get(rule[0])?.add(rule[1])
        } else {
            mapOfSets.set(rule[0], new Set<number>([rule[1]]))
        }
    }
    return mapOfSets;
}

function ex1(rules: Map<number, Set<number>>, produce: number[][]): number {
    let sum: number = 0;

    for (const line of produce) {
        let n: number = line.length;
        let good:boolean=true;

        for (let i: number = n-1;i > 0; i--) {
            for (let j: number = i-1; j >=0; j--) {
                if(rules.get(line[i])?.has(line[j])){
                    good=false
                    break
                }
            }
        }
        if(good){
            // console.log(line[Math.floor(n/2)]+" "+line)
            sum+=line[Math.floor(n/2)]
        }

    }

    return sum
}

function ex2(rules: Map<number, Set<number>>, produce: number[][]): number {
    let sum: number = 0;

    for (const line of produce) {
        let n: number = line.length;
        let good:boolean=true
        for (let i: number = n-1;i > 0; i--) {
            for (let j: number = i-1; j >=0; j--) {
                if(rules.get(line[i])?.has(line[j])){
                    good=false
                    let tmp:number=line[i]
                    line[i]=line[j]
                    line[j]=tmp
                }
            }
        }

        if(!good){
            // console.log(line)
            sum+=line[Math.floor(n/2)]
        }

    }

    return sum
}

const data: [[number, number][], number[][]] = parseInput("./data2.txt")
const rules: Map<number, Set<number>> = makeRules(data[0])
// console.log(data)
// console.log(rules)
console.log("ex1: " + ex1(rules,data[1]))
console.log("ex2: " + ex2(rules,data[1]))