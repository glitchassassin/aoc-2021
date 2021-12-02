import fs from 'fs';

// https://adventofcode.com/2021/day/1

let increased = 0;
let previous = undefined;
let total = 0;
for (let line of fs.readFileSync('input1.txt', { encoding: 'utf-8' }).split('\n')) {
    const current = parseInt(line)
    if (previous !== undefined && previous < current) {
        previous = current;
        increased += 1;
    }
    previous = current;
    total += 1;
}
console.log(`${increased} lines increased out of ${total}`)