import fs from 'fs';

// https://adventofcode.com/2021/day/3

// I wanted to solve part 2 with some fancy binary arithmetic, but it's actually recursive.
// We're looking at the most common bits in the remaining subset after filtering each bit
// position, not the most common bits from the entire list (as in part 1).

const lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n')

function findOxygenGeneratorRating(lines: string[], index: number = 0): string {
    if (lines.length === 1 || index === lines[0].length) {
        return lines[0]
    }

    const mostCommonBit = lines.map(line => parseInt(line[index])).reduce((a, b) => a + b, 0) >= (lines.length / 2) ? '1' : '0'

    return findOxygenGeneratorRating(lines.filter(line => line[index] === mostCommonBit), index + 1)
}

function findCo2ScrubberRating(lines: string[], index: number = 0): string {
    if (lines.length === 1 || index === lines[0].length) {
        return lines[0]
    }

    const leastCommonBit = lines.map(line => parseInt(line[index])).reduce((a, b) => a + b, 0) >= (lines.length / 2) ? '0' : '1'

    return findCo2ScrubberRating(lines.filter(line => line[index] === leastCommonBit), index + 1)
}

const oxygenGeneratorRating = parseInt(findOxygenGeneratorRating(lines), 2)
const co2ScrubberRating = parseInt(findCo2ScrubberRating(lines), 2)
const lifeSupport = oxygenGeneratorRating * co2ScrubberRating

console.log(`oxygen: ${oxygenGeneratorRating}, co2: ${co2ScrubberRating}, life support: ${lifeSupport}`);
