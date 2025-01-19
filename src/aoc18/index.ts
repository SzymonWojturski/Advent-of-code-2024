import * as fs from 'fs';
import Queue = require('queue-fifo');

function parseInput(filename: string): [number, number][] {
    const lines: string[] = fs.readFileSync(filename, 'utf-8').trim().split('\n');
    const coordinates: [number, number][] = lines.map((line: string): [number, number] => {
        const [x, y] = line.split(',').map(Number);
        return [x, y];
    });
    return coordinates;
}

function makeGraph(unreachableNodes: [number, number][], graphSize: number,bytesCorrupted:number): boolean[][] {
    let nodes: boolean[][] = Array.from({length: graphSize}, (): boolean[] => Array.from({length: graphSize}, (): boolean => true));
    for(let i:number=0;i<bytesCorrupted;i++){
        const [coordinateX, coordinateY]:[number,number]=unreachableNodes[i]
        nodes[coordinateY][coordinateX] = false
    }
    return nodes
}

function BFS(nodes: boolean[][], startingX: number, startingY: number, graphSize: number): number[][] {
    let Q: Queue<[number, number]> = new Queue<[number, number]>();
    let neiPairs: [number, number][] = [[-1, 0], [0, -1], [0, 1], [1, 0]]
    let visited: boolean[][] = Array.from({length: graphSize}, (): boolean[] => Array.from({length: graphSize}, (): boolean => false));
    let dist: number[][] = Array.from({length: graphSize}, (): number[] => Array.from({length: graphSize}, (): number => Infinity));
    //init
    visited[startingX][startingY] = true
    dist[startingX][startingY] = 0
    Q.enqueue([startingX, startingY])
    //loop
    while (!Q.isEmpty()) {
        const [Ux, Uy]: [number, number] = Q.dequeue()!
        for (const [dx, dy] of neiPairs) {
            if (graphSize > Ux + dx && Ux + dx >= 0 && graphSize > Uy + dy && Uy + dy >= 0 && !visited[Ux + dx][Uy + dy] && nodes[Ux + dx][Uy + dy]) {
                visited[Ux + dx][Uy + dy] = true
                dist[Ux + dx][Uy + dy] = dist[Ux][Uy] + 1
                Q.enqueue([Ux + dx, Uy + dy])
            }
        }
    }
    return dist
}

function ex1(data: [number, number][], graphSize: number,bytesCorrupted:number): number {
    let nodes: boolean[][] = makeGraph(data, graphSize,bytesCorrupted)
    let distances: number[][] = BFS(nodes, 0, 0, graphSize)
    return distances[graphSize - 1][graphSize - 1]
}

function ex2(data: [number, number][], graphSize: number):[number,number]{
    let [left,middle,right]:[number,number,number]=[0,0,data.length]
    while (left<=right){
        middle=Math.floor((left+right)/2)
        let resL:number= ex1(data, graphSize,middle)
        let resR:number= ex1(data, graphSize,middle+1)
        if (resL!==Infinity && resR===Infinity){
            return data[middle]
        }else if(resL===Infinity){
            right=middle-1
        }
        else {
            left=middle+1
        }
    }
    return [-1,-1]
}

let data: [number, number][] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data, 71,1024));
console.log("ex2: ", ex2(data, 71));
