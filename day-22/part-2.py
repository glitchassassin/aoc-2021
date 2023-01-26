import re

cubes = set()

def volume(cube):
    x, y, z = cube
    return len(x) * len(y) * len(z)

def intersects(cube1, cube2):
    return (
        (cube1[0][0] in cube2[0] or cube1[0][-1] in cube2[0]) and
        (cube1[1][0] in cube2[1] or cube1[1][-1] in cube2[1]) and
        (cube1[2][0] in cube2[2] or cube1[2][-1] in cube2[2])
    )

def union(cube1, cube2):
    x1, y1, z1 = cube1[1]
    x2, y2, z2 = cube2[1]

    # Slice each cube
    xSlices = sorted([x1[0], x1[-1], x2[0], x2[-1]])
    ySlices = sorted([y1[0], y1[-1], y2[0], y2[-1]])
    zSlices = sorted([z1[0], z1[-1], z2[0], z2[-1]])

    print(x1, x2)
    print(xSlices)

    cubes = set()

    for x in range(0, len(xSlices) - 1):
        for y in range(0, len(ySlices) - 1):
            for z in range(0, len(zSlices) - 1):
                cubes.add((
                    cube1[0],
                    (
                        range(xSlices[x], xSlices[x + 1]),
                        range(ySlices[y], ySlices[y + 1]),
                        range(zSlices[z], zSlices[z + 1]),
                    )
                ))
    
    return cubes

def difference(cube1, cube2):
    pass

c1 = ('on', (range(0, 4), range(0, 4), range(0, 4)))
c2 = ('on', (range(2, 6), range(2, 6), range(2, 6)))

print(union(c1, c2))

# print('Reading lines...', end='')
# for line in open('sample.txt').readlines():
#     action, xmin, xmax, ymin, ymax, zmin, zmax = re.match(r"(on|off) x=([\d\-]+)\.\.([\d\-]+),y=([\d\-]+)\.\.([\d\-]+),z=([\d\-]+)\.\.([\d\-]+)", line).groups()

#     cube = (action, (
#         range(int(xmin), int(xmax) + 1), 
#         range(int(ymin), int(ymax) + 1), 
#         range(int(zmin), int(zmax) + 1)
#     ))

#     for c in cubes:
#         _, c1 = c
#         _, c2 = cube
#         if intersects(c1, c2):
#             print(c1, c2)

#     cubes.add(cube)
    
#     print('.', end='')

# print('\n' + str(len(cubes)))