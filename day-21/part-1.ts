import fs from 'fs';

// https://adventofcode.com/2021/day/21

export function load(filename: string) {
    return fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n').map(row => new Player(parseInt(row.slice(row.length -2).trim())))
}

let die = -1;
function roll() {
    die++;
    return (die % 100) + 1;
}

class Player {
    public score = 0;
    constructor(public space: number) { this.space--; }

    takeTurn() {
        this.space = (this.space + roll() + roll() + roll()) % 10;
        this.score += this.space + 1;
    }
}

const players = load('input.txt');
gameloop:
while (players.every(p => p.score < 1000)) {
    for (const p of players) {
        p.takeTurn()
        if (p.score >= 1000) break gameloop;
    };
}

// Score
console.log('part 1:', Math.min(...players.map(p => p.score)) * (die + 1));