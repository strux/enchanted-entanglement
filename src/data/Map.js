const mapData = [
    '#########################',
    '#.###..R#T..###.#####R###',
    '#.###.###.#.###.#####.###',
    '#.....#...#.....###...###',
    '#.#####.###.#.#.###.#####',
    '#...#...###.#.#...#.....#',
    '###.#.#####.###.#.#.###.#',
    '###...#####.#...#...#...#',
    '#####.#######.#######.###',
    '#...#.###.....###...#...#',
    '#.#.#.###.#######.#.#.#.#',
    '#.#.....#....g#...#...#.#',
    '###.#####.....#.#.#####.#',
    '#............G#.#.#.....#',
    '#####.#####...#.###.###.#',
    '###...#####..R.r###.###.#',
    '###.#######.#######.#####',
    '###...###.......###.###.#',
    '#####.###.#####.###.###.#',
    '#...#.###.#####.....#R..#',
    '#.#.#.###.#####.###.###.#',
    '#.#.#.....#####.###.###.#',
    '#.#.#.###.#####.###.###.#',
    '#R#.....#.......#.......#',
    '#########################',
]
const tileDict = {
    '#': {
        type: 'wall',
        collide: true,
        style: {
            'background-color': 'hsl(0, 0%, 50%)',
        },
    },
    '.': {
        type: 'floor',
        collide: false,
        style: {
            'background-color': 'hsl(0, 0%, 90%)',
        },
    },
    'r': {
        type: 'prize',
        collide: false,
        unitId: 1,
        color: 'red',
        style: {
            'background-color': 'hsl(0, 100%, 80%)',
        },
    },
    'g': {
        type: 'prize',
        collide: false,
        unitId: 2,
        color: 'green',
        style: {
            'background-color': 'hsl(130, 70%, 50%)',
        },
    },
    'R': {
        type: 'exit',
        collide: false,
        unitId: 1,
        color: 'red',
        style: {
            'background-color': 'hsl(0, 100%, 70%)',
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
    'G': {
        type: 'exit',
        collide: false,
        unitId: 2,
        color: 'green',
        style: {
            'background-color': 'hsl(130, 70%, 40%)',
        },
    },
}
export default mapData.flatMap(row => row.split('').map(key => tileDict[key]))
