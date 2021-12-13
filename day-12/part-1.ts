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

function path(startNode: string, pathNodes: string[] = []) {
    for (let destination of nodes[startNode]) {
        if (destination === 'end') {
            paths.push(pathNodes.concat([startNode, destination]))
        } else if (!(destination.toLowerCase() === destination && pathNodes.includes(destination))) {
            path(destination, pathNodes.concat([startNode]));
        }
    }
}

// Load nodes
fs.readFileSync('input.txt', { encoding: 'utf-8' }).split('\n').map(f => connection(f.trim().split('-')));

path('start');

console.log(paths.length);