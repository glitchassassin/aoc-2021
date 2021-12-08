import fs from 'fs';

// https://adventofcode.com/2021/day/6

let fish = fs.readFileSync('input.txt', { encoding: 'utf-8' }).trim().split(',').map(f => parseInt(f))

const tick = (fish: number[]): number[] => {
    const newFish = fish.filter(f => f === 0).length;
    return fish.map(f => f === 0 ? 6 : f - 1).concat(new Array(newFish).fill(8))
}

new Array(80).fill(0).forEach(() => fish = tick(fish))

console.log(fish.length);