const mapSource = [
    '#########################',
    '#.###..g#...###.#####R###',
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
    '#...#.###.#####.....#r..#',
    '#.#.#.###.#####.###.###.#',
    '#.#.#.....#####.###.###.#',
    '#.#.#.###.#####.###.###.#',
    '#G#.....#.......#.......#',
    '#########################',
]

export const tileDict = {
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
export const mapData = mapSource.reduce((accum, curr) => accum.concat(curr.split('')), []).map(key => tileDict[key])

export default mapData
