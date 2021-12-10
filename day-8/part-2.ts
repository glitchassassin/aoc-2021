import fs from 'fs';

// https://adventofcode.com/2021/day/8

let lines = fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n');
console.log(
    lines.map(line => {
        let [signals, output] = line.trim().split(' | ').map(s => s.split(' ').map(signal => signal.split(''))) as [string[][], string[][]]
        const lookup: Record<string, string[]|undefined> = {
            '1': signals.find(s => s.length === 2),
            '4': signals.find(s => s.length === 4),
            '7': signals.find(s => s.length === 3),
            '8': signals.find(s => s.length === 7),
        };
        lookup['3'] = signals.find(s => s.length === 5 && lookup['7']?.every(c => s.includes(c)));
        lookup['9'] = signals.find(s => s.length === 6 && lookup['3']?.every(c => s.includes(c)));
        lookup['5'] = signals.find(s => s.length === 5 && s !== lookup['3'] && s?.every(c => lookup['9']?.includes(c)));
        lookup['2'] = signals.find(s => s.length === 5 && ![lookup['3'], lookup['5']].includes(s));
        lookup['0'] = signals.find(s => s.length === 6 && !lookup['5']?.every(c => s.includes(c)));
        lookup['6'] = signals.find(s => s.length === 6 && ![lookup['9'], lookup['0']].includes(s));
        
        return parseInt(
            output
                .map(digit => 
                    Object.entries(lookup)
                        .filter(([key, signal]) => signal?.length === digit.length && signal?.every(s => digit.includes(s)))
                        .map(([key, signal]) => key)
                ).join('')
        )
    }).reduce((a, b) => a + b)
);