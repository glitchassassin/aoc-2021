from statistics import mean
from math import factorial

# https://adventofcode.com/2021/day/7

with open('input.txt') as infile:
	positions = [int(i) for i in infile.readline().split(',')]
	bestCost = None
	for target in range(min(positions), max(positions)):
		cost = sum([((abs(i - target) - 1) * (abs(i - target) / 2) + abs(i - target)) for i in positions])
		if bestCost is None or cost < bestCost:
			bestCost = cost
			
	print(bestCost)

