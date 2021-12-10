def adjacent(x, y):
	return [
		(x + 1, y),
		(x, y + 1),
		(x - 1, y),
		(x, y - 1),
	]

def check(grid, x, y, x2, y2):
	if (x2 < 0 or y2 < 0):
		return True
	try:
		return grid[x][y] < grid[x2][y2]
	except IndexError:
		return True

with open('input.txt') as infile:
	grid = [[int(c) for c in row.strip()] for row in infile.readlines()]
	
	risk = 0
	
	for y in range(0, len(grid[0])):
		for x in range(0, len(grid)):
			if all(check(grid, x, y, x2, y2) for (x2, y2) in adjacent(x, y)):
				risk += 1 + grid[x][y]
				
	print(risk)
