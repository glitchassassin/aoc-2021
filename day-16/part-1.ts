import fs from 'fs';

export interface Packet {
    version: number
    type: number
}

export interface LiteralPacket extends Packet {
    type: 4
    value: number
}

export interface OperatorPacket extends Packet {
    lengthType: number,
    length: number,
    packets: Packet[]
}

function read(stream: string[], length: number) {
    let value = '';
    for (let i = 0; i < length; i++) {
        value += stream.shift() ?? ''
    }
    return parseInt(value, 2);
}

function readAsString(stream: string[], length: number) {
    let value = '';
    for (let i = 0; i < length; i++) {
        value += stream.shift() ?? ''
    }
    return value;
}

// https://adventofcode.com/2021/day/16

export function load(filename: string) {
    return fs.readFileSync(filename, { encoding: 'utf-8' })
    .split('\n')
    .map(l => l.split('')
        .map(i => parseInt(i, 16).toString(2).padStart(4, '0'))
        .join('')
        .split('')
    );
}

const packets = load('input.txt')

function packetValue(packetStream: string[]) {
    let value = '';
    while (true) {
        let chunk = readAsString(packetStream, 5)
        value += chunk.slice(1)
        if (chunk[0] === '0') break;
    }
    return parseInt(value, 2);
}

function packetOperator(packet: Packet, packetStream: string[]): OperatorPacket {
    const lengthType = read(packetStream, 1)
    let length = 0;
    const packets: Packet[] = [];
    if (lengthType === 0) {
        length = read(packetStream, 15)
        const nestedPackets = [];
        for (let i = 0; i < length; i++) {
            if (!packetStream.length) break;
            nestedPackets.push(packetStream.shift() as string)
        }
        while (nestedPackets.length) {
            packets.push(packetConsumer(nestedPackets))
        }
    } else {
        length = read(packetStream, 11)
        for (let i = 0; i < length; i++) {
            packets.push(packetConsumer(packetStream))
        }
    }
    return {
        ...packet,
        lengthType,
        length,
        packets
    }
}

export function packetConsumer(packetStream: string[]) {
    const packet: Packet = {
        version: read(packetStream, 3),
        type: read(packetStream, 3),
    }
    if (packet.type === 4) {
        return {
            ...packet,
            value: packetValue(packetStream)
        } as LiteralPacket
    } else {
        return packetOperator(packet, packetStream)
    }
}

function score(packet: Packet): number {
    if (packet.type !== 4) {
        return packet.version + (packet as OperatorPacket).packets.reduce((sum, p) => sum + score(p), 0)
    }
    return packet.version;
}

for (let packet of packets) {
    console.log('part 1: ', score(packetConsumer(packet)))
}