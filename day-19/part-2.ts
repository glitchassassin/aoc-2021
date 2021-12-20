import { load, Coord, scannerOffsets } from './part-1';

// https://adventofcode.com/2021/day/19

function manhattanDistance(c1: Coord, c2: Coord) {
    return Math.abs(c2[2] - c1[2]) + Math.abs(c2[1] - c1[1]) + Math.abs(c2[0] - c1[0])
}

let bestDistance = 0;
for (const c1 of scannerOffsets) {
    for (const c2 of scannerOffsets) {
        bestDistance = Math.max(bestDistance, manhattanDistance(c1, c2))
    }
}

console.log('part 2:', bestDistance);
