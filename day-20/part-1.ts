import fs from 'fs';

// https://adventofcode.com/2021/day/20

export function load(filename: string): [string, string[]] {
    const [algorithm, image] = fs.readFileSync(filename, { encoding: 'utf-8' }).split('\n\n')
    return [
        algorithm,
        image.split('\n'),
    ]
}

const [algorithm, image] = load('input.txt')

/**
 * Pads image with an extra 2 pixels on each side, for ease of calculation
 */
export function padImage(image: string[], pad = '.') {
    const emptyRow = new Array(image[0].length + 4).fill(pad).join('');
    return [
        emptyRow,
        emptyRow,
        ...image.map(row => `${pad}${pad}${row}${pad}${pad}`),
        emptyRow,
        emptyRow,
    ]
}

function enhanceBackground(background: string, algorithm: string) {
    return algorithm[parseInt(new Array(9).fill(background === '.' ? 0 : 1).join(''), 2)]
}

export function enhance(image: string[], algorithm: string) {
    const output: string[] = [];
    for (let y = 0; y < image.length - 2; y++) {
        let row = '';
        for (let x = 0; x < image[0].length - 2; x++) {
            const slice = image.slice(y, y+3).map(row => row.slice(x, x+3)).join('')
            const index = parseInt(slice.replaceAll('.', '0').replaceAll('#', '1'), 2)
            row += algorithm[index];
        }
        output.push(row);
    }
    return padImage(output, enhanceBackground(image[0][0], algorithm));
}

export function score(image: string[]) {
    return image.reduce((sum, row) => sum + row.trim().replaceAll('.', '').length, 0)
}

let newImage = padImage(image);
newImage = enhance(newImage, algorithm);
newImage = enhance(newImage, algorithm);
console.log('part 1:', score(newImage));