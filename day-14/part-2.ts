import fs from 'fs';

// https://adventofcode.com/2021/day/14

let template: Record<string, number> = {};
let rules: Record<string, string> = {};

fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').forEach(f => {
    if (f.includes('->')) {
        const [pair, element] = f.split(' -> ');
        rules[pair] = element;
    } else if (f !== '') {
        for (let i = 0; i < f.length - 1; i++) {
            template[f.slice(i, i+2)] = (template[f.slice(i, i+2)] ?? 0) + 1
        }
    }
});

const pairInsert = (template: Record<string, number>, rules: Record<string, string>) => {
    const results: Record<string, number> = {};
    for (const pair in template) {
        const insert = rules[pair]
        if (insert) {
            const p1 = pair[0] + insert;
            const p2 = insert + pair[1];
            results[p1] = (results[p1] ?? 0) + template[pair]
            results[p2] = (results[p2] ?? 0) + template[pair]
        } else {
            results[pair] = (results[pair] ?? 0) + template[pair]
        }
    }
    return results
}

const score = (template: Record<string, number>, i = 1) => {
    const scores: Record<string, number> = {}
    for (let pair in template) {
        scores[pair[0]] = (scores[pair[0]] ?? 0) + template[pair]
        scores[pair[1]] = (scores[pair[1]] ?? 0) + template[pair]
    }
    for (let c in scores) {
        scores[c] = Math.ceil(scores[c] / 2)
    }

    let mostCommon: [string, number] = ['NONE', 0];
    let leastCommon: [string, number] = ['NONE', Infinity]

    for (let c in scores) {
        if (scores[c] > mostCommon[1]) {
            mostCommon = [c, scores[c]]
        }
        if (scores[c] < leastCommon[1]) {
            leastCommon = [c, scores[c]]
        }
    }
    return mostCommon[1] - leastCommon[1]
}

for (let i = 0; i < 40; i++) {
    template = pairInsert(template, rules);
    console.log(i)
}

console.log(score(template))