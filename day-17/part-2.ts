import fs from 'fs';

// https://adventofcode.com/2021/day/17

interface Range { min: number, max: number }
interface Area { x: Range, y: Range }

export function load(filename: string) {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
    .replace('target area:', '').trim().split(', ')
    .reduce((out, line) => {
        const [axis, range] = line.split('=');
        const [min, max] = range.split('..');
        out[axis as 'x'|'y'].min = parseInt(min);
        out[axis as 'x'|'y'].max = parseInt(max);
        return out;
    }, {x: {min: 0, max: 0}, y: { min: 0, max: 0}});
}

const targetArea = load('input.txt')

interface Vector {
    x: number,
    y: number,
    dx: number,
    dy: number
}

function step(velocity: Vector) {
    return {
        x: velocity.x + velocity.dx,
        y: velocity.y + velocity.dy,
        dx: velocity.dx === 0 ? 0 : velocity.dx - (velocity.dx / Math.abs(velocity.dx)),
        dy: velocity.dy - 1
    }
}

function test(targetArea: Area, dx: number, dy: number) {
    let velocity = { x: 0, y: 0, dx, dy };
    let maxY = -Infinity;
    while (velocity.x <= targetArea.x.max && velocity.y >= targetArea.y.min) {
        maxY = Math.max(velocity.y, maxY);
        if (velocity.x >= targetArea.x.min && velocity.y <= targetArea.y.max) {
            return maxY;
        }
        velocity = step(velocity);
    }
    return undefined;
}

function generateRanges(targetArea: Area) {
    let count = 0
    for (let x = 0; x <= targetArea.x.max; x++) {
        for (let y = 1000; y >= targetArea.y.min; y--) {
            const result = test(targetArea, x, y);
            if (result !== undefined) {
                count++;
            }
        }
    }
    console.log('part 1:', count);
}

generateRanges(targetArea);
