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
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
}

let score = 0;
for (const line of lines) {
    const stack: string[] = []
    for (const c of line.split('')) {
        if (brackets[c]) {
            stack.push(brackets[c]);
        } else if (c !== stack.pop()) {
            // Corrupted line
            console.log('Corrupted: ', line)
            score += scores[c];
            break;
        }
    }
    if (stack.length) {
        // Incomplete line
        console.log('Incomplete: ', line)
    }
}
console.log(score);