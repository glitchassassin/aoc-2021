import fs from 'fs';

// https://adventofcode.com/2021/day/8

let lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');
console.log(
    lines.map(line => {
        let [signals, output] = line.trim().split(' | ').map(s => s.split(' ')) as [string[], string[]]
        let targetSignals = signals.filter(s => signals.filter(s2 => s2.length === s.length).length === 1).map(s => s.length)
        return output.filter(o => targetSignals.includes(o.length)).length;
    }).reduce((a, b) => a + b)
);