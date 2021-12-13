import fs from 'fs';
import { Grid, Cell } from '../common/Grid';

// https://adventofcode.com/2021/day/10

let grid = new Grid(fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(f => f.trim().split('').map(i => parseInt(i))))

let flashed: Cell<number>[] = []
let flashes = 0;
const energize = (cell: Cell<number>) => {
    cell.value += 1;
    if (cell.value > 9 && !flashed.find(c => cell.equals(c))) {
        flashed.push(cell);
        flashes += 1;
        cell.getAllAdjacent().forEach(energize);
    }
}

let iteration = 0;
while (flashes < 100) {
    iteration += 1;
    flashes = 0;
    for (const cell of grid.all()) {
        energize(cell);
    }
    flashed = [];
    for (const cell of grid.all()) {
        if (cell.value > 9) {
            cell.value = 0;
        }
    }
}
console.log(grid.render(), iteration, '\n')