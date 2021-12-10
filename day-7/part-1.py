from statistics import median

# https://adventofcode.com/2021/day/7

with open('input.txt') as infile:
	positions = [int(i) for i in infile.readline().split(',')]
	cost = sum([abs(i - median(positions)) for i in positions])
	
	print(median(positions), cost)
