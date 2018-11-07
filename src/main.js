import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex);

const mapData = [
    '#########################',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '#.......................#',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '###.#########.#####.#####',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '#...............#.......#',
    '#.......#.......#.......#',
    '#.......#...............#',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '###.#######.#########.###',
    '#.......#.......#.......#',
    '#.......#.......#.......#',
    '#.......#...............#',
    '###.....#.......#.......#',
    '###.............#.......#',
    '###.....#.......#.......#',
    '###.....#.......#.......#',
    '#########################',
]
const tileDict = {
    '#': {
        type: 'wall',
        collide: true,
        style: {
            'background-color': 'gray',
        }
    },
    '.': {
        type: 'floor',
        collide: false,
        style: {
            'background-color': 'gainsboro',
        }
    },
}
const mapTiles = mapData.map(row => row.split('').map(key => tileDict[key]))

const initialState = {
    game: {
        state: 'play',
        timer: 30 * 1000,
    },
    gameBoard: {
        tileSize: 42,
        tiles: mapTiles,
    },
    units: [
        {
            color: 'red',
            row: 11,
            column: 11,
            prizeGlyph: 2,
            exitGlyph: 3,
        },
    ],
}

const store = new Vuex.Store({
    state: initialState,
    mutations: {
        createGameBoard (state, payload) {
            let board = []
            for (var x=0; x < payload.rows; x++) {
                let row = [];
                for (var y=0; y < payload.columns; y++) {
                    row.push('open')
                }
                board.push(row)
            }
            state.gameBoard.tiles = board
        },
    },
    getters: {
        getTile: (state) => (row, column) => {
            if (typeof state.gameBoard.tiles[row] === 'undefined' ||
                typeof state.gameBoard.tiles[row][column] === 'undefined') {
                return undefined
            } else {
                return state.gameBoard.tiles[row][column]
            }
        },
        isUnitOnTile: (state) => (row, column) => {
            return state.units.some(unit => unit.row === row && unit.column === column)
        },
        isOpenTile: (state, getters) => (row, column) => {
            return getters.getTile(row, column) !== 1 &&
                   getters.getTile(row, column) !== undefined &&
                   !getters.isUnitOnTile(row, column)
        },
        getBoardRows: state => {
            return state.gameBoard.tiles.length
        },
        getBoardColumns: state => {
            return state.gameBoard.tiles[0].length
        },
    },
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
