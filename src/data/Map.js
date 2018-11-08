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
            'background-color': 'lightsalmon',
        },
    },
    'g': {
        type: 'prize',
        collide: false,
        color: 'green',
        style: {
            'background-color': 'lightgreen',
        },
    },
    'R': {
        type: 'exit',
        collide: false,
        color: 'red',
        style: {
            'background-color': 'salmon',
        },
    },
    'G': {
        type: 'exit',
        collide: false,
        color: 'green',
        style: {
            'background-color': 'mediumseagreen',
        },
    },
}
const mapTiles = mapData.map(row => row.split('').map(key => tileDict[key]))

export default mapTiles
