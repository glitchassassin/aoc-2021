import math

def adjacent(grid, x, y):
    return [(x2, y2) for (x2, y2) in [
        (x + 1, y),
        (x, y + 1),
        (x - 1, y),
        (x, y - 1),
    ] if (0 <= x2 < len(grid[0])) and (0 <= y2 < len(grid))]

def check(grid, x, y, x2, y2):
    return grid[y][x] <= grid[y2][x2]

def getBasin(grid, x, y, basin = []):
    if grid[y][x] == 9:
        return basin
    # print('getting basin for', (x, y), grid[y][x])
    valid = True
    for (x2, y2) in adjacent(grid, x, y):
        # print((x2, y2), (x2, y2) in basin, check(grid, x, y, x2, y2))
        valid = valid and grid[y][x] < 9 and ((x2, y2) in basin or check(grid, x, y, x2, y2))
    if valid:
        basin.append((x, y))
        # print(basin)
        for (x2, y2) in adjacent(grid, x, y):
            if (0 <= x2 < len(grid[0])) and (0 <= y2 < len(grid)) and (x2, y2) not in basin:
                getBasin(grid, x2, y2, basin)
    return basin

with open('input.txt') as infile:
    grid = [[int(c) for c in row.strip()] for row in infile.readlines()]
    
    basins = []
    
    for y in range(0, len(grid)):
        for x in range(0, len(grid[0])):
            if all(check(grid, x, y, x2, y2) for (x2, y2) in adjacent(grid, x, y)):
                # print(x, y)
                basins.append(getBasin(grid, x, y, []))

    for y in range(0, len(grid)):
        for x in range(0, len(grid[0])):
            if (any((x, y) in basin for basin in basins)):
                print(grid[y][x], end='')
            else:
                print(' ', end='')
        print('')

    print(math.prod(sorted([len(basin) for basin in basins], reverse=True)[:3]))
