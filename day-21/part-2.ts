import fs from 'fs';

// https://adventofcode.com/2021/day/21

export function load(filename: string): GameState {
    return fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n').map(row => [parseInt(row.slice(row.length -2).trim()) - 1, 0]) as GameState
}

// total score - 0 - 30
// spot - 0 - 9
// 

type Player = [number, number]
type GameState = [Player, Player]

let gameStates = load('sample.txt')

function generateProbabilities() {
    const probabilities: Map<number, number> = new Map();

    for (var a = 1; a < 4; a++) {
        for (var b = 1; b < 4; b++) {
            for (var c = 1; c < 4; c++) {
                const key = a + b + c;
                probabilities.set(key, (probabilities.get(key) ?? 0) + 1);
            }
        }
    }
    return probabilities;
}

const probabilities = generateProbabilities();

console.log(probabilities);

type PlayerScoreboard = Map<number, Map<number, number>>;

function playRound(scoreboard: PlayerScoreboard, finalScores: Map<number, number>, round: number) {
    const newScores: PlayerScoreboard = new Map();
    for (const [spot, scores] of scoreboard) {
        for (const [score, count] of scores) {
            for (const [roll, rollCount] of probabilities) {
                const newSpot = (spot + roll) % 10;
                const newScore = score + (newSpot + 1);
                const newCount = count * rollCount;

                if (newScore >= 21) {
                    finalScores.set(round, (finalScores.get(round) ?? 1) + newCount);
                } else {
                    const spotMap = newScores.get(newSpot) ?? new Map();
                    spotMap.set(newScore, newCount);
                    newScores.set(newSpot, spotMap);
                }
            }
        }
    }
    return newScores
}

let player1: PlayerScoreboard = new Map();
const player1FinalScores = new Map<number, number>();
let player2: PlayerScoreboard = new Map();
const player2FinalScores = new Map<number, number>();
player1.set(gameStates[0][0] - 1, new Map([[0, 1]]))
player2.set(gameStates[1][0] - 1, new Map([[0, 1]]))
for (let i = 1; i < 30; i++) {
    player1 = playRound(player1, player1FinalScores, i);
    player2 = playRound(player2, player2FinalScores, i);
    if (player1.size === 0 && player2.size === 0) break;
    // console.log(player1);
    // if (i > 3) break;
}
console.log(player1FinalScores, player2FinalScores);

let p1wins = 0;
let p2wins = 0;

let p1total = 0;
let p2total = 0;
const actualTotal = 786_316_482_957_123;

for (const [p1round, p1count] of player1FinalScores) {
    for (const [p2round, p2count] of player2FinalScores) {
        p1total += p1count;
        p2total += p2count;
        if (p1round >= p2round) {
            p1wins += p1count * p2count;
        } else {
            p2wins += p1count * p2count;
        }
    }
}

console.log(p1total, p2total, p1total * p2total)

console.log(p1wins, p2wins)