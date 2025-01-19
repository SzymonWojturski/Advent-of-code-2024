import fs from "fs";
import {exec} from "child_process";
import path from "path";

function parseInput(filename: string): [[number, number], [number, number], [number, number]][] {

    const regex = /Button A: X\+(\d+), Y\+(\d+)\s+Button B: X\+(\d+), Y\+(\d+)\s+Prize: X=(\d+), Y=(\d+)/g;

    const matches: [[number, number], [number, number], [number, number]][] = [];
    let match;
    while ((match = regex.exec(fs.readFileSync(filename, 'utf-8'))) !== null) {
        matches.push([[parseInt(match[1]), parseInt(match[2])], [parseInt(match[3]), parseInt(match[4])], [parseInt(match[5]), parseInt(match[6])]])
    }
    return matches
}
function runCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Błąd: ${error.message}`);
                return;
            }

            if (stderr) {
                reject(`Błąd wykonania MiniZinc: ${stderr}`);
                return;
            }

            resolve(stdout.trim());
        });
    });
}

async function ex1(data: [[number, number], [number, number], [number, number]][]): Promise<number> {
    let sum: number = 0;
    const mznFilePath: string = path.resolve("./Playground.mzn");

    for (const machine of data) {
        const dzn: string = `a_button=[${machine[0][0]},${machine[0][1]}];b_button=[${machine[1][0]},${machine[1][1]}];prize=[${machine[2][0]},${machine[2][1]}]`;
        const command = `minizinc ${mznFilePath} -D "${dzn}" `;

        try {
            const output = await runCommand(command);
            const matches = output.match(/\[(.*?)]/g);

            console.log(matches)
            if (matches && matches.length >= 2) {
                const constraints_met: number[] = matches[0].replace(/[\[\]]/g, "").split(",").map(Number);
                const buttons_pressed: number[] = matches[1].replace(/[\[\]]/g, "").split(",").map(Number);

                if (constraints_met.filter((x: number): boolean => x === 1).length === 2) {
                    // console.log(buttons_pressed);
                    sum += buttons_pressed[0] * 3 + buttons_pressed[1];
                    console.log("Aktualna suma:", sum);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return sum;
}

async function ex2(data: [[number, number], [number, number], [number, number]][]): Promise<number> {
    let sum: number = 0;
    const mznFilePath: string = path.resolve("./Playground2.mzn");

    for (const machine of data) {
        let max_a:number=Math.ceil( Math.max(((machine[2][0]+10000000000000)/machine[0][0]),(machine[2][1]+10000000000000)/machine[0][1]))
        let max_b:number=Math.ceil(Math.max(((machine[2][0]+10000000000000)/machine[1][0]),(machine[2][1]+10000000000000)/machine[1][1]))
        const dzn: string = `a_button=[${machine[0][0]},${machine[0][1]}];b_button=[${machine[1][0]},${machine[1][1]}];prize=[${machine[2][0]+10000000000000},${machine[2][1]+10000000000000}];max_a=${max_a};max_b=${max_b}`;
        const command = `minizinc ${mznFilePath} -D "${dzn}" `;
        // console.log(dzn)
        try {
            const output = await runCommand(command);
            const match = output.match(/\[(.*?)]/g);


            if (match) {
                // console.log(match)
                const buttons_pressed: number[] = match[0].replace(/[\[\]]/g, "").split(",").map(Number);

                sum += buttons_pressed[0] * 3 + buttons_pressed[1];
                console.log("Aktualna suma:", sum);

            }
        } catch (error) {
            console.error(error);
        }
    }

    return sum;
}

// Użycie
(async () => {
    let data: [[number, number], [number, number], [number, number]][] = parseInput("./data2.txt");
    const wynikEx1 = await ex1(data);
    console.log("ex1 wynik:", wynikEx1);

    const wynikEx2 = await ex2(data);
    console.log("ex2 wynik:", wynikEx2);
})();