export class Cell<T> {
    constructor(
        public grid: Grid<T>,
        public x: number,
        public y: number
    ) { }

    get value() {
        return this.grid._grid[this.y][this.x]
    }

    set value(newValue: T) {
        this.grid._grid[this.y][this.x] = newValue;
    }

    equals(cell: Cell<T>) {
        return cell.x === this.x && cell.y === this.y && cell.grid === this.grid;
    }

    getAdjacent(): Cell<T>[] {
        return this.grid.getAdjacent(this.x, this.y)
    }

    getAllAdjacent(): Cell<T>[] {
        return this.grid.getAllAdjacent(this.x, this.y)
    }
}

export class Grid<T> {
    constructor(public _grid: T[][] = []) { }

    /**
     * Gets a cell from the grid
     * @param x 
     * @param y 
     * @returns value at coords in grid, or undefined if coords are invalid
     */
    get(x: number, y: number): Cell<T>|undefined {
        if (
            this._grid.length === 0 || 
            this._grid[0].length === 0 ||
            x < 0 || x >= this._grid[0].length ||
            y < 0 || y >= this._grid.length
        ) {
            return undefined
        }
        return new Cell(this, x, y)
    }

    /**
     * Sets value at specified coordinates. If outside of current grid, throw error.
     * @param x 
     * @param y 
     * @param value
     */
    set(x: number, y: number, value: T) {
        if (
            this._grid.length === 0 || 
            this._grid[0].length === 0 ||
            x < 0 || x >= this._grid[0].length ||
            y < 0 || y >= this._grid.length
        ) {
            throw new Error(`Invalid coords for grid: (${x}, ${y})`)
        }
        this._grid[y][x] = value;
    }

    getAdjacent(x: number, y: number): Cell<T>[] {
        const offsets: [number, number][] = [[-1, 0], [0, -1], [1, 0], [0, 1]];
        return offsets.map(([xd, yd]) => this.get(x + xd, y + yd)).filter(v => v !== undefined) as Cell<T>[];
    }

    getAllAdjacent(x: number, y: number): Cell<T>[] {
        const offsets: [number, number][] = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 0], [-1, 1]];
        return offsets.map(([xd, yd]) => this.get(x + xd, y + yd)).filter(v => v !== undefined) as Cell<T>[];
    }

    *all(): Iterable<Cell<T>> {
        if (
            this._grid.length === 0 || 
            this._grid[0].length === 0
        ) {
            return
        }
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid.length; x++) {
                yield new Cell(this, x, y)
            }
        }
    }

    render() {
        return this._grid.map(row => row.join('')).join('\n')
    }
}