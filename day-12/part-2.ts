import fs from 'fs';

// https://adventofcode.com/2021/day/10

const nodes: Record<string, Set<string>> = {};

function connection(newNodes: string[]) {
    nodes[newNodes[0]] ??= new Set();
    nodes[newNodes[0]].add(newNodes[1]);
    nodes[newNodes[1]] ??= new Set();
    nodes[newNodes[1]].add(newNodes[0]);
}

const paths: string[][] = [];

function canDuplicate(pathNodes: string[], target: string) {
    const lowercase = pathNodes.filter(p => p.toLowerCase() === p)
    return lowercase.length === new Set(lowercase).size || !pathNodes.includes(target)
}

function path(pathNodes: string[]) {
    for (let destination of nodes[pathNodes[pathNodes.length - 1]]) {
        if (destination === 'end') {
            paths.push(pathNodes.concat([destination]))
        } else if (destination === 'start') {
            continue;
        } else if (destination.toUpperCase() === destination || canDuplicate(pathNodes, destination)) {
            path([...pathNodes, destination]);
        }
    }
}

// Load nodes
fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(f => connection(f.trim().split('-')));

path(['start']);

console.log(paths.length);