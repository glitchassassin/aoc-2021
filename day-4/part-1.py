from pprint import pprint
from itertools import chain, islice

def check_board(board, draws):
	for i in range(0,4):
		if all(c in draws for c in islice(board, i, i + 5)) or all(c in draws for c in islice(board, i, (i + 5) * 5, 5)):
			return sum(int(c) for c in board if c not in draws) * int(draws[-1])
	return None 

def check_boards(boards, draws):
	for i in range(1, len(draws)):
		for board in boards:
			result = check_board(board, draws[:i])
			if result is not None:
				return result

with open('input.txt') as infile:
	lines = infile.readlines()
	draws = lines.pop(0).strip().split(',')
	
	boards = []
	
	for i in range(0, len(lines), 6):
		boards.append(list(chain(*[line.split() for line in lines[i+1:i+6]])))
	
	print(check_boards(boards, draws))
