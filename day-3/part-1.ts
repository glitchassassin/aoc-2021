import fs from 'fs';

// https://adventofcode.com/2021/day/3

const bits: number[] = [];
let count = 0;
for (let line of fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')) {
    count++;
    line.split('').forEach((bit, index) => {
        bits[index] = (bits[index] ?? 0) + parseInt(bit);
    });
}
const gamma = parseInt(bits.map(bit => bit < (count / 2) ? 0 : 1).join(''), 2);
const epsilon = parseInt(bits.map(bit => bit > (count / 2) ? 0 : 1).join(''), 2);
const powerConsumption = gamma * epsilon;
console.log(`gamma: ${gamma}, epsilon: ${epsilon}, power consumption: ${powerConsumption}`);
