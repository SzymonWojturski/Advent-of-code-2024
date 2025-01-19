import * as fs from 'fs';
import {isNumberObject} from "node:util/types";
import {domainToASCII} from "node:url";

function parseInput(filename: string): any {
    return fs.readFileSync(filename, 'utf-8').split("\r\n").map((x: string):number[]=> x.split("").map((x:string):number=>parseInt(x)))
}

function BFS2(data:number[][],[si,sj]:[number,number]):number{
    let n:number=data.length
    let m:number=data[0].length
    let Q:[number,number][]=[]
    let neiPairs:[number,number][]=[[-1,0],[0,-1],[0,1],[1,0]]
    let sum:number=0

    Q.push([si,sj])
    while(Q.length>0){
        let [Ui,Uj]:[number,number]=Q.shift()!!
        for(const [di,dj] of neiPairs){
            if( n>Ui+di && Ui+di>=0 &&  m>Uj+dj && Uj+dj>=0  &&data[Ui][Uj]+1===data[Ui+di][Uj+dj]){
                console.log([Ui,Uj],data[Ui][Uj]," -> ",[Ui+di,Uj+dj],data[Ui+di][Uj+dj])
                if(data[Ui+di][Uj+dj]===9){
                    sum++
                }

                Q.push([Ui+di,Uj+dj])
            }
        }
    }
    return sum
}

function ex2(data:number[][]):number{
    let sum:number=0
    let n:number=data.length
    let m:number=data[0].length

    for(let i:number=0;i<n;i++){
        for(let j:number=0;j<m;j++){
            if(data[i][j]===0){
                sum+=BFS2(data,[i,j])
            }
        }
    }




    return sum
}



function BFS(data:number[][],[si,sj]:[number,number]):number{
    let n:number=data.length
    let m:number=data[0].length
    let visited: boolean[][] = Array.from({ length: n }, ():boolean[] => Array.from({ length: m }, ():boolean => false));
    let parent: [number,number][][] = Array.from({ length: n }, ():[number,number] [] => Array.from({ length: m }, ():[number,number] => [-1,-1]));
    let Q:[number,number][]=[]
    let neiPairs:[number,number][]=[[-1,0],[0,-1],[0,1],[1,0]]

    parent[si][sj]=[si,sj]
    visited[si][sj]=true
    Q.push([si,sj])
    // funkcja BreadthFirstSearch (Graf G, Wierzchołek s)
    // dla każdego wierzchołka u z G:
        // rodzic[u] = NIL
    // rodzic[s] = NIL
    // Q.push(s)

    while(Q.length>0){
        let [Ui,Uj]:[number,number]=Q.pop()??[-10,-10]
        for(const [di,dj] of neiPairs){
            if( n>Ui+di && Ui+di>=0 &&  m>Uj+dj && Uj+dj>=0 &&  !visited[Ui+di][Uj+dj] &&data[Ui][Uj]+1===data[Ui+di][Uj+dj]){
                visited[Ui+di][Uj+dj]=true
                parent[Ui+di][Uj+dj]=parent[Ui][Uj]
                // console.log([Ui,Uj],data[Ui][Uj]," -> ",[Ui+di,Uj+dj],data[Ui+di][Uj+dj])

                Q.push([Ui+di,Uj+dj])
            }
        }
    }
    // dopóki kolejka Q nie jest pusta:
    //     u = Q.front()
        // Q.pop()
        // dla każdego v z listy sąsiedztwa u:
        //     jeżeli v jest biały:
                // rodzic[v] = u
                // Q.push(v)

    //checking

    let sum:number=0
    for(let i:number=0;i<n;i++){
        for(let j:number=0;j<m;j++){
            if(visited[i][j] && data[i][j]===9){
                sum++
            }
        }
    }
    return sum
}

function ex1(data:number[][]):number{
    let sum:number=0
    let n:number=data.length
    let m:number=data[0].length

    for(let i:number=0;i<n;i++){
        for(let j:number=0;j<m;j++){
            if(data[i][j]===0){
                sum+=BFS(data,[i,j])
            }

        }
    }




    return sum
}

let data: number[][] = parseInput("./data2.txt")
// console.log(data)
console.log("ex1: ", ex1(data));
console.log("ex2: ", ex2(data));