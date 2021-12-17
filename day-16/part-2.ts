import fs from 'fs';
import { load, packetConsumer, Packet, OperatorPacket, LiteralPacket } from './part-1';

// https://adventofcode.com/2021/day/16

const packets = load('input.txt')

packets.forEach(packetStream => {
    const packet = packetConsumer(packetStream);
    console.log('part 2: ', packetValue(packet))
})

function packetValue(packet: Packet): number {
    if (packet.type === 4) {
        return (packet as LiteralPacket).value
    } else if (packet.type === 0) {
        return (packet as OperatorPacket).packets.reduce((sum, p) => sum + packetValue(p), 0)
    } else if (packet.type === 1) {
        return (packet as OperatorPacket).packets.reduce((product, p) => product * packetValue(p), 1)
    } else if (packet.type === 2) {
        return Math.min(...(packet as OperatorPacket).packets.map(p => packetValue(p)))
    } else if (packet.type === 3) {
        return Math.max(...(packet as OperatorPacket).packets.map(p => packetValue(p)))
    } else if (packet.type === 5) {
        return packetValue((packet as OperatorPacket).packets[0]) > packetValue((packet as OperatorPacket).packets[1]) ? 1 : 0
    } else if (packet.type === 6) {
        return packetValue((packet as OperatorPacket).packets[0]) < packetValue((packet as OperatorPacket).packets[1]) ? 1 : 0
    } else if (packet.type === 7) {
        return packetValue((packet as OperatorPacket).packets[0]) === packetValue((packet as OperatorPacket).packets[1]) ? 1 : 0
    } else {
        throw new Error(`Invalid packet type ${packet.type}`)
    }
}