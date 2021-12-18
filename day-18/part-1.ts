import fs from 'fs';

// https://adventofcode.com/2021/day/18
// I am not proud of using string manipulation for this,
// but it was the easiest solution I saw at the moment.

export function load(filename: string) {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
    .split('\n')
}

export function add(p1: string, p2: string) {
    return reduce(`[${p1},${p2}]`)
}

export function explode(pairs: string) {
    let level = 0;
    for (let index = 0; index < pairs.length; index++) {
        const c = pairs[index];
        if (c === '[') {
            level++;
        } else if (c === ']') {
            level--;
        } else if (level > 4) {
            // Explode!
            
            const left = pairs.slice(0, index-1)
            const remaining = pairs.slice(index)
            const [p1, p2] = remaining.slice(0, remaining.indexOf(']')).split(',')
            const right = remaining.slice(remaining.indexOf(']')+1)

            let modified = ''

            const leftNumber = [...left.matchAll(/\d+/g)].pop();
            const rightNumber = [...right.matchAll(/\d+/g)].shift();

            if (leftNumber?.index) {
                modified += left.slice(0, leftNumber.index);
                modified += `${parseInt(leftNumber[0]) + parseInt(p1)}`;
                modified += left.slice(leftNumber.index + leftNumber[0].length);
            } else {
                modified += left;
            }

            modified += '0';

            if (rightNumber?.index) {
                modified += right.slice(0, rightNumber.index);
                modified += `${parseInt(rightNumber[0]) + parseInt(p2)}`;
                modified += right.slice(rightNumber.index + rightNumber[0].length);
            } else {
                modified += right;
            }
            return modified;
        }
    }
    return pairs;
}

export function split(pairs: string) {
    const match = [...pairs.matchAll(/\d\d+/g)].shift();
    if (!match?.index) return pairs;
    const p1 = Math.floor(parseInt(match[0]) / 2)
    const p2 = Math.ceil(parseInt(match[0]) / 2)
    return pairs.slice(0, match.index) + `[${p1},${p2}]` + pairs.slice(match.index + match.length + 1)
}

export function reduce(pairs: string) {
    let reduced = pairs;
    while (true) {
        let current = explode(reduced)
        if (current !== reduced) {
            reduced = current;
            continue;
        }
        current = split(reduced);
        if (current !== reduced) {
            reduced = current;
            continue;
        }
        break;
    }
    return reduced;
}

type Pair = [number|Pair, number|Pair];

export function magnitude(pairs: Pair): number {
    return (3 * (typeof pairs[0] === 'number' ? pairs[0] : magnitude(pairs[0]))) + (2 * (typeof pairs[1] === 'number' ? pairs[1] : magnitude(pairs[1])))
}

const sum = load('input.txt').reduce(add)

console.log('part1:', magnitude(JSON.parse(sum)))