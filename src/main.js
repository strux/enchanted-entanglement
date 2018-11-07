import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import mapTiles from './data/Map.js'

Vue.config.productionTip = false
Vue.use(Vuex);

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
        getWall: (state, getters) => (direction, row, column) => {
            switch(direction) {
                case 'top':
                    return getters.getTile(row-1, column)
                case 'bottom':
                    return getters.getTile(row+1, column)
                case 'left':
                    return getters.getTile(row, column-1)
                case 'right':
                    return getters.getTile(row, column+1)
            }
        },
        isUnitOnTile: (state) => (row, column) => {
            return state.units.some(unit => unit.row === row && unit.column === column)
        },
        isOpenTile: (state, getters) => (row, column) => {
            let tile = getters.getTile(row, column)
            return tile.collide === false &&
                   tile !== undefined &&
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
