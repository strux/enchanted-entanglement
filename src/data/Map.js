const mapData = [
    '#########################',
    '#.###..R#...###.#####R###',
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
            'background-color': 'gray',
        },
    },
    '.': {
        type: 'floor',
        collide: false,
        style: {
            'background-color': 'gainsboro',
        },
    },
    'r': {
        type: 'prize',
        collide: false,
        color: 'red',
        style: {
            'background-color': 'red',
            'opacity': 0.2,
        },
    },
    'g': {
        type: 'prize',
        collide: false,
        color: 'green',
        style: {
            'background-color': 'green',
            'opacity': 0.2,
        },
    },
    'R': {
        type: 'exit',
        collide: false,
        color: 'red',
        style: {
            'background-color': 'red',
            'opacity': 0.5,
        },
    },
    'G': {
        type: 'exit',
        collide: false,
        color: 'green',
        style: {
            'background-color': 'green',
            'opacity': 0.5,
        },
    },
}
const mapTiles = mapData.map(row => row.split('').map(key => tileDict[key]))

export default mapTiles
