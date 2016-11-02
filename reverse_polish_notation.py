from collections import deque


# Reverse Polish Notation
s = '5 1 2 + 4 * + 3 -'

supported_operators = ['+', '-', '*', '/']

# TODO: support for operators
def is_operator(c):
	return c in supported_operators

# TODO: add more tests to predicate
def is_operand(c):
	return not is_operator(c)

d = deque()
for c in s.split(' '):
	if is_operand(c):
		d.appendleft(c)
		
	elif is_operator(c):
		one = d.popleft()
		two = d.popleft()
		eq = '%d %s %d' % (int(two), c, int(one))
		print('%6s' % eq)
	
		d.appendleft(eval(eq))

print('Answer: %d' % d.pop())
