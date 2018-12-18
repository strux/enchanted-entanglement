const mapSource = [
    '#########################',
    '#.###..p#...###.#####O###',
    '#.###.###.#.###.#####.###',
    '#.....#...#.....###...###',
    '#.#####.###.#.#.###.#####',
    '#...#...###.#.#...#.....#',
    '###.#.#####.###.#.#.###.#',
    '###...#####.#...#...#...#',
    '#####.#######.#######.###',
    '#...#.###.....###...#...#',
    '#.#.#.###.#######.#.#.#.#',
    '#.#.....#.....#...#...#.#',
    '###.#####.....#.#.#####.#',
    '#.............#.#.#.....#',
    '#####.#####...#.###.###.#',
    '###...#####.....###.###.#',
    '###.#######.#######.#####',
    '###...###.......###.###.#',
    '#####.###.#####.###.###.#',
    '#...#.###.#####.....#o..#',
    '#.#.#.###.#####.###.###.#',
    '#.#.#.....#####.###.###.#',
    '#.#.#.###.#####.###.###.#',
    '#P#.....#.......#.......#',
    '#########################',
]

export const tileDict = {
    '#': {
        type: 'wall',
        collide: true,
        style: {
            'background-color': 'hsl(100, 35%, 45%)',
        },
    },
    '.': {
        type: 'floor',
        collide: false,
        style: {
            'background-color': 'hsl(108, 30%, 70%)',
        },
    },
    'o': {
        type: 'prize',
        collide: false,
        unitId: 1,
        style: {
            'background-color': 'hsl(29, 100%, 75%)',
        },
    },
    'O': {
        type: 'exit',
        collide: false,
        unitId: 1,
        style: {
            'background-color': 'hsl(29, 100%, 65%)',
        },
    },
    'p': {
        type: 'prize',
        collide: false,
        unitId: 2,
        color: 'green',
        style: {
            'background-color': 'hsl(265, 100%, 85%)',
        },
    },
    'P': {
        type: 'exit',
        collide: false,
        unitId: 2,
        color: 'green',
        style: {
            'background-color': 'hsl(265, 100%, 75%)',
        },
    },
    'T': {
        type: 'time',
        collide: false,
        color: 'blue',
        style: {
            'background-color': 'hsl(240, 60%, 70%)',
        },
    },
}
export const mapData = mapSource.reduce((accum, curr) => accum.concat(curr.split('')), []).map(key => tileDict[key])

export default mapData
