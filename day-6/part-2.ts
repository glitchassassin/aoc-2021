import fs from 'fs';

// https://adventofcode.com/2021/day/6

let fish = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split(',').map(f => parseInt(f))

const cycles = new Array(9).fill(0);
const queuedCycles = [0, 0]

// Initialize buckets
fish.forEach(f => cycles[f] += 1);

const tick = (cycles: number[], cycle: number) => {
    const spawnCycle = (cycle + 2) % 7;
    queuedCycles.push(cycles[cycle]);
    cycles[cycle] += queuedCycles.shift() ?? 0;
}

for (let i = 0; i < 256; i++) {
    tick(cycles, i % 7)
}

console.log(cycles.reduce((a, b) => a + b) + queuedCycles.reduce((a, b) => a + b))