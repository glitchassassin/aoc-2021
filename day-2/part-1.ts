import fs from 'fs';

// https://adventofcode.com/2021/day/2

let horizontal = 0;
let vertical = 0;
for (let line of fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')) {
    const [action, distance] = line.split(' ');
    if (action === 'forward') {
        horizontal += parseInt(distance);
    } else if (action === 'up') {
        vertical -= parseInt(distance);
    } else { // action is 'down'
        vertical += parseInt(distance);
    }
}
console.log(`horizontal: ${horizontal}, vertical: ${vertical}, final: ${horizontal * vertical}`);
