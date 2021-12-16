import fs from 'fs';
import { Grid, Cell } from '../common/Grid';

// https://adventofcode.com/2021/day/15

const grid = new Grid(fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(l => l.split('').map(i => parseInt(i))));

const target = grid.get(grid._grid[0].length-1, grid._grid.length-1)!;

const frontier: [Cell<number>, number][] = [[grid.get(0, 0)!, 0]];
const origin: Map<Cell<number>, Cell<number>> = new Map();
const originCost: Map<Cell<number>, number> = new Map();

const heuristic = (a: Cell<number>, b: Cell<number>) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

while (frontier.length) {
    const [current, priority] = frontier.shift() ?? [];
    if (!current || priority === undefined) continue;
    const currentCost = originCost.get(current) ?? 0;
    if (target?.equals(current)) break; // Found our goal

    const newSquares = (current
        .getAdjacent()
        .filter(c => !origin.has(c) || (originCost.get(c) ?? Infinity) > currentCost + c.value)
        .map(c => [c, currentCost + c.value + heuristic(c, target)]) ?? []
    ) as [Cell<number>, number][];

    newSquares.forEach(([c, v]) => {
        origin.set(c, current);
        originCost.set(c, currentCost + c.value)
    });

    frontier.push(...newSquares);
    frontier.sort(([_1, a], [_2, b]) => a - b);
}

console.log(originCost.get(target))