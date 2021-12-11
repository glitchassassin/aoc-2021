import fs from 'fs';

// https://adventofcode.com/2021/day/10

let lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(f => f.trim())

const brackets: Record<string, string> = {
    '(': ')',
    '{': '}',
    '[': ']',
    '<': '>',
}

const scores: Record<string, number> = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
}

let score: number[] = [];
for (const line of lines) {
    let stack: string[] = []
    for (const c of line.split('')) {
        if (brackets[c]) {
            stack.push(brackets[c]);
        } else if (c !== stack.pop()) {
            // Corrupted line
            console.log('Corrupted: ', line)
            stack = [];
            break;
        }
    }
    if (stack.length) {
        // Incomplete line
        let lineScore = 0;
        stack.reverse().forEach(c => {
            lineScore = (lineScore * 5) + scores[c]
        })
        score.push(lineScore)
        console.log('Incomplete: ', line, lineScore)
    }
}
console.log(score.sort((a, b) => a - b)[Math.floor(score.length / 2)]);