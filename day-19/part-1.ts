import fs from 'fs';

// https://adventofcode.com/2021/day/19

// I hate coordinates. This is an ugly and inefficient brute-force solution, but it *is* a solution.

export type Coord = [number, number, number];

const ANGLES = [
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1],
]
const AXES = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 1, 0],
    [2, 0, 1],
]

export function distance(c1: Coord, c2: Coord) {
    return Math.round(Math.sqrt(
        Math.pow(c2[0] - c1[0], 2) + 
        Math.pow(c2[1] - c1[1], 2) + 
        Math.pow(c2[2] - c1[2], 2)
    ) * 1e5) / 1e5
}

function offsets(reference: Coord, target: Coord): [Coord, Coord, Coord][] {
    const offs = [];
    for (const angle of ANGLES) {
        for (const axis of AXES) {
            offs.push([angle, axis, reference.map((v, i) => (target[axis[i]] * angle[axis[i]]) + v)] as [Coord, Coord, Coord]);
        }
    }
    return offs;
}

class Scanner {
    public distances = new Map<number, [Coord, Coord]>();
    constructor(public beacons: Coord[] = []) {
        for (let b1 of beacons) {
            for (let b2 of beacons) {
                const d = distance(b1, b2);
                if (d !== 0) this.distances.set(d, [b1, b2]);
            }
        }
    }

    orient(angle: Coord, axis: Coord, offset: Coord): Coord[] {
        return this.beacons.map(beacon => axis.map((v, i) => (offset[i] - (beacon[v] * angle[v])))) as Coord[]
    }

    compare(other: Scanner) {
        for (let b1 of this.beacons) {
            for (let b2 of other.beacons) {
                for (let offs of offsets(b1, b2)) {
                    const oriented = other.orient(...offs)
                    let matches = oriented.filter(beacon => this.beacons.some(b => b.every(c => beacon.includes(c))));
                    if (matches.length >= 12) {
                        // Offset found
                        this.beacons.push(...oriented.filter(b => !matches.includes(b)));
                        return offs[2];
                    }
                }
            }
        }
        return false;
    }

    debug() {
        return this.beacons.map(c => distance([0, 0, 0], c))
    }
}

export function load(filename: string) {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
    .split('\n\n')
    .map(scanner => new Scanner(
        scanner
            .split('\n')
            .slice(1)
            .map(r => 
                r.split(',').map(n => parseInt(n))
            ) as Coord[]
    ))
}

const scanners = load('input.txt')

export let scannerOffsets: Coord[] = [];
let unmatched = scanners.slice(1);

while (unmatched.length) {
    console.log(unmatched.length, 'remaining')
    unmatched = unmatched.filter((scanner, index) => {
        const result = scanners[0].compare(scanner)
        console.log(index + 1, result)
        if (result !== false) {
            scannerOffsets.push(result);
            return false;
        }
        return true;
    })
}

console.log('part 1:', scanners[0].beacons.length);
