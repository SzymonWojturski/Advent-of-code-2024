import * as fs from 'fs';

function parseInput(filename: string): string[][] {
    const lines: string[] = fs.readFileSync(filename, 'utf-8').trim().split('\r\n');
    return [lines[0].split(", "), [...lines.slice(2)]];
}

function ex1(data: string[][]): number {
    let sum: number = 0
    for (const design of data[1]) {
        if (BFS(design, data[0])) {
            sum++
        }
    }

    return sum
}

function ex2(data: string[][]): number {
    let sum: number = 0
    for (const design of data[1]) {
        sum += BFS2(design, data[0])
    }

    return sum
}

function BFS(word: string, nodes: string[]): boolean {
    let Q: [number, number][] = []
    let maxCharLen: number = Math.max(...nodes.map((x) => x.length))
    let visited: boolean[][] = Array.from({length: word.length + 1}, (): boolean[] => Array.from({length: word.length + 1}, (): boolean => false));
    //init
    visited[0][0] = true
    Q.push([0, 0])
    //loop
    while (Q.length > 0) {
        const [firstToFind, currentIndex]: [number, number] = Q.pop()!
        if (currentIndex - firstToFind <= maxCharLen) {
            Q.push([firstToFind, currentIndex + 1])
            Q.push()
            for (const char of nodes) {
                if (firstToFind + char.length <= word.length &&
                    !visited[firstToFind + char.length][firstToFind + char.length] &&
                    char.length + firstToFind <= word.length &&
                    word.slice(firstToFind, currentIndex) === char
                ) {
                    visited[firstToFind + char.length][firstToFind + char.length] = true
                    Q.push([firstToFind + char.length, firstToFind + char.length])
                }
            }
        }
    }
    return visited[word.length][word.length]
}

function BFS2(word: string, nodes: string[]): number {
    let Q: [number, number][] = []
    let visited: number[][] = Array.from({length: word.length + 1}, (): number[] => Array.from({length: word.length + 1}, (): number => 0));
    //init
    visited[0][0] = 1
    Q.push([0, 0])
    for (let i: number = 0; i < word.length + 1; i++) {
        for (let j: number = 0; j < word.length + 1; j++) {
            while (Q.length > 0) {
                const [firstToFind, currentIndex]: [number, number] = Q.pop()!
                for (const char of nodes) {
                    if (firstToFind + char.length <= word.length &&
                        visited[firstToFind][currentIndex - char.length]>0 &&
                        char.length + firstToFind <= word.length &&
                        word.slice(firstToFind, currentIndex) === char
                    ) {
                        visited[firstToFind + char.length][firstToFind + char.length]+= visited[firstToFind][currentIndex- char.length];
                        Q.push([firstToFind + char.length, firstToFind + char.length])
                    }
                }
            }
            Q.push([i, j])
        }
    }

    return visited[word.length][word.length]
}

let data: string[][] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data));
console.log("ex2: ", ex2(data));