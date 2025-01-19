import * as fs from 'fs';


function parseInput(filename: string) :[number,number[]][]{
    let partial:string[][] = fs.readFileSync(filename, 'utf-8').split("\r\n").map((line:string):string[] => line.split(": "))
    return partial.map((line:string[]):[number,number[]] => [parseInt(line[0]), line[1].split(" ").map((x:string):number => parseInt(x))])

}
function dec2bin(maxDec: number, dec: number): string {
    const binaryLength:number = (maxDec >>> 0).toString(2).length;
    const binary :string= (dec >>> 0).toString(2);
    return binary.padStart(binaryLength, '0');
}
function ex1(data:[number,number[]][]):number {
    let sum:number=0

    for (const equation of data){
        let result:number=equation[0]
        let n:number=equation[1].length

        for(let combinations:number=(2**(n-1))-1;combinations>=0;combinations--) {
            let possibleResult:number=equation[1][0]
            let combinationsBinary:string=dec2bin((2**(n-1))-1,combinations)
            // console.log(combinationsBinary,equation,n)
            for(let i:number=0;i<combinationsBinary.length;i++){
                // console.log(operator)
                if(combinationsBinary[i]==="1"){
                    possibleResult*=equation[1][1+i]
                }
                else {

                    possibleResult+=equation[1][1+i]
                }
            }
            if(result===possibleResult){
                sum+=result
                break
            }
        }

    }


    return sum
}
function dec2trin(maxDec: number, dec: number): string {
    const binaryLength:number = (maxDec >>> 0).toString(3).length;
    const binary :string= (dec >>> 0).toString(3);
    return binary.padStart(binaryLength, '0');
}
function ex2(data:[number,number[]][]):number {
    let sum:number=0

    for (const equation of data){
        let result:number=equation[0]
        let n:number=equation[1].length

        for(let combinations:number=(3**(n-1))-1;combinations>=0;combinations--) {
            let possibleResult:number=equation[1][0]
            let combinationsTrinary:string=dec2trin((3**(n-1))-1,combinations)
            // console.log(combinationsTrinary,equation,n)
            for(let i:number=0;i<combinationsTrinary.length;i++){
                // console.log(operator)
                if(combinationsTrinary[i]==="2"){
                    possibleResult*=equation[1][1+i]
                }
                else if (combinationsTrinary[i]==="1"){

                    possibleResult+=equation[1][1+i]
                }
                else {
                    possibleResult=parseInt(possibleResult.toString()+equation[1][1+i].toString())
                }

            }
            if(result===possibleResult){
                sum+=result
                // console.log(equation)
                break
            }
        }

    }


    return sum
}
const data = parseInput("./data2.txt")
// console.log(data)
console.log("ex1: " + ex1(data))
console.log("ex2: " + ex2(data))