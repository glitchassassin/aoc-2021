import fs from 'fs';
import { Grid } from '../common/Grid';

// https://adventofcode.com/2021/day/13

const points: [number, number][] = [];
const folds: [number, number][] = [];

fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').forEach(f => {
    if (f.includes('fold along')) {
        const fold = f.replace('fold along ', '').split('=');
        if (fold[0] === 'x') {
            folds.push([parseInt(fold[1]), 10000])
        } else {
            folds.push([10000, parseInt(fold[1])])
        }
    } else if (f.includes(',')) {
        points.push(f.trim().split(',').map(i => parseInt(i)) as [number, number])
    }
});

// Debugging function
function render(points: [number, number][]) {
    const dimensions = points.reduce((bounds, point) => {
        return {
            x1: Math.min(bounds.x1, point[0]),
            y1: Math.min(bounds.y1, point[1]),
            x2: Math.max(bounds.x2, point[0]),
            y2: Math.max(bounds.y2, point[1]),
        }
    }, {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
    })
    for (let y = dimensions.y1; y <= dimensions.y2; y++) {
        let line = '';
        for (let x = dimensions.x1; x <= dimensions.x2; x++) {
            line += points.find(p => p[0] === x && p[1] === y) ? '#' : '.'
        }
        console.log(line);
    }
}

const fold = (points: [number, number][]): [number, number][] => points
    .map(([x, y]) => {
        return [
            x > folds[0][0] ? folds[0][0] + (folds[0][0] - x) : x,
            y > folds[0][1] ? folds[0][1] + (folds[0][1] - y) : y,
        ]
    })

// First fold only
console.log(new Set(fold(points).map(([x, y]) => `${x},${y}`)).size)