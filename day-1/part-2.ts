import fs from 'fs';

const sum = (a: number, b: number) => a + b

let increased = 0;
let previous: number[] = [];
let total = 0;

for (let line of fs.readFileSync('input1.txt', { encoding: 'utf-8' }).split('\n')) {
    total += 1;
    previous.push(parseInt(line))
    if (previous.length < 4) continue;
    previous = previous.slice(-4);


    if (previous.slice(0, 3).reduce(sum) < previous.slice(1, 4).reduce(sum)) {
        increased += 1;
    }
}
console.log(`${increased} lines increased out of ${total}`)