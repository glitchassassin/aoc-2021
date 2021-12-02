from collections import Counter

def lineRange(v1, v2):
	return range(v1, v2 + (1 if v1 < v2 else -1), 1 if v1 < v2 else -1)

with open('input.txt') as infile:
	points = Counter()
	for row in infile.readlines():
		line = [[int(c) for c in p.split(',')] for p in row.strip().split(' -> ')]
		p1, p2 = line
		if p1[0] == p2[0]:
			points.update((p1[0], i) for i in lineRange(p1[1], p2[1]))
		elif p1[1] == p2[1]:
			points.update((i, p1[1]) for i in lineRange(p1[0], p2[0]))
		
	print([p for p in points.items() if p[1] > 1])
	print(len([p for p in points.items() if p[1] > 1]))
