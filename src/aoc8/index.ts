import * as fs from 'fs';

function parseInput(filename: string): string[] {
    return fs.readFileSync(filename, 'utf-8').split("\r\n");
}

function makeMap(data: string[]): Map<string, Set<[number, number]>> {
    let map: Map<string, Set<[number, number]>> = new Map();
    let [n, m]: [number, number] = [data.length, data[0].length]
    for (let i: number = 0; i < n; i++) {
        for (let j: number = 0; j < m; j++) {
            if (data[i][j] !== ".") {
                if (!map.has(data[i][j])) {
                    map.set(data[i][j], new Set<[number, number]>())
                }
                map.get(data[i][j])?.add([i, j])
            }
        }
    }
    return map
}

function isInBoundry(point: [number, number], boundry: [number, number]): boolean {
    return (boundry[0] > point[0] && point[0] >= 0 && boundry[1] > point[1] && point[1] >= 0)
}

function ex1(data: string[]): number {
    let sum = 0;
    let map: Map<string, Set<[number, number]>> = makeMap(data)
    let [n, m]: [number, number] = [data.length, data[0].length]
    let res: Set<number> = new Set<number>()

    for (const antennas of map.values()) {
        for (const antenna1 of antennas) {
            for (const antenna2 of antennas) {
                if (antenna1 !== antenna2) {
                    let diff: [number, number] = [antenna1[0] - antenna2[0], antenna1[1] - antenna2[1]]
                    let antinode1: [number, number] = [antenna1[0] + diff[0], antenna1[1] + diff[1]]
                    let antinode2: [number, number] = [antenna2[0] - diff[0], antenna2[1] - diff[1]]
                    if (isInBoundry(antinode1, [n, m]) && !res.has(antinode1[0] * n + antinode1[1])) {
                        res.add(antinode1[0] * n + antinode1[1])
                    }

                    if (isInBoundry(antinode2, [n, m]) && !res.has(antinode2[0] * n + antinode2[1])) {
                        res.add(antinode2[0] * n + antinode2[1])
                    }
                }

            }

        }
    }
    return res.size
}

function ex2(data: string[]): number {
    let sum = 0;
    let map: Map<string, Set<[number, number]>> = makeMap(data)
    let [n, m]: [number, number] = [data.length, data[0].length]
    let res: Set<number> = new Set<number>()

    for (const antennas of map.values()) {
        for (const antenna1 of antennas) {
            for (const antenna2 of antennas) {
                if (antenna1 !== antenna2) {
                    let mul:number=-1;
                    let diff: [number, number] = [antenna1[0] - antenna2[0], antenna1[1] - antenna2[1]]
                    let antinode1: [number, number] = [antenna1[0] + diff[0], antenna1[1] + diff[1]]
                    let antinode2: [number, number] = [antenna2[0] - diff[0], antenna2[1] - diff[1]]
                    while (isInBoundry(antinode1, [n, m]) || isInBoundry(antinode2, [n, m])){
                        mul++
                        antinode1= [antenna1[0] + diff[0]*mul, antenna1[1] + diff[1]*mul]
                        antinode2= [antenna2[0] - diff[0]*mul, antenna2[1] - diff[1]*mul]

                        if (isInBoundry(antinode1, [n, m]) && !res.has(antinode1[0] * n + antinode1[1])) {
                            res.add(antinode1[0] * n + antinode1[1])
                        }

                        if (isInBoundry(antinode2, [n, m]) && !res.has(antinode2[0] * n + antinode2[1])) {
                            res.add(antinode2[0] * n + antinode2[1])
                        }
                    }
                }

            }

        }
    }
    return res.size
}

let data: string[] = parseInput("./data2.txt")
console.log("ex1: ", ex1(data));
console.log("ex2: ", ex2(data));