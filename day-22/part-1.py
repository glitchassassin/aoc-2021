import re

cubes = set()

print('Reading lines...', end='')
for line in open('input.txt').readlines():
    action, xmin, xmax, ymin, ymax, zmin, zmax = re.match(r"(on|off) x=([\d\-]+)\.\.([\d\-]+),y=([\d\-]+)\.\.([\d\-]+),z=([\d\-]+)\.\.([\d\-]+)", line).groups()

    for x in range(max(-50, int(xmin)), min(50, int(xmax)) + 1):
        for y in range(max(-50, int(ymin)), min(50, int(ymax)) + 1):
            for z in range(max(-50, int(zmin)), min(50, int(zmax)) + 1):
                if (action == 'on'):
                    cubes.add((x, y, z))
                else:
                    try:
                        cubes.remove((x, y, z))
                    except KeyError:
                        pass
    
    print('.', end='')

print('\n' + str(len(cubes)))