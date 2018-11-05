import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        game: {
            state: 'pending',
            timer: 30 * 1000,
        },
        gameBoard: {
            tileSize: 50,
            tiles: null,
        },
        units: [
            {
                color: 'red',
                row: 1,
                column: 1,
                canExit: true,
                onExit: false,
            },
            {
                color: 'green',
                row: 2,
                column: 2,
                canExit: true,
                onExit: false,
            },
        ],
    },
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
            return getters.getTile(row, column) !== 'closed' &&
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
