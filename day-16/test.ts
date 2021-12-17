import { Readable } from 'stream';

const stream = Readable.from(['1', '2', '3', '4', '5', '6', '7']);
console.log(stream.read(1))
console.log(stream.read(2))