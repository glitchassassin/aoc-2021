import { add, load, magnitude } from './part-1';

// https://adventofcode.com/2021/day/18

const numbers = load('input.txt');

let max: [string, string, number]|[] = [];

for (const n1 of numbers) {
    for (const n2 of numbers) {
        const mag = magnitude(JSON.parse(add(n1, n2)));
        if (!max.length || mag > max[2]) {
            max = [n1, n2, mag]
        }
    }
}

console.log('part2:', max[2])