import fs from 'fs';

// https://adventofcode.com/2021/day/14

let template = ''
let rules: [string, string][] = [];

fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').forEach(f => {
    if (f.includes('->')) {
        rules.push(f.split(' -> ') as [string, string]);
    } else if (f !== '') {
        template = f;
    }
});

const pairInsert = (template: string, rules: [string, string][]) => {
    let result = '';
    for (let i = 0; i < template.length; i++) {
        result += template[i];
        if (i < template.length - 1) {
            const [_, insert] = rules.find(([pair, element]) => pair === template.slice(i, i+2)) ?? [];
            if (insert) {
                result += insert;
            }
        }
    }
    return result
}

const score = (template: string) => {
    const scores: Record<string, number> = {}
    for (let c of template) {
        scores[c] = (scores[c] ?? 0) + 1
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
    console.log(mostCommon, leastCommon);
    return mostCommon[1] - leastCommon[1]
}

for (let i = 0; i < 10; i++) {
    template = pairInsert(template, rules);
}

console.log(score(template))