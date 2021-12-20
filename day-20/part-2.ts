import { load, padImage, enhance, score } from './part-1';

// https://adventofcode.com/2021/day/19

const [algorithm, image] = load('input.txt');

let newImage = padImage(image);
for (let i = 0; i < 50; i++) {
    newImage = enhance(newImage, algorithm);
}
console.log('part 2:', score(newImage));