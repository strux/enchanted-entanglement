import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import mapTiles from './data/Map.js'

Vue.config.productionTip = false
Vue.use(Vuex);

const initialState = {
    game: {
        state: 'exit',
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
        updateState (state, stateName) {
            state.game.state = stateName
        },
        moveUnit (state, payload) {
            payload.unit.row = payload.row
            payload.unit.column = payload.column
        },

    },
    actions: {
        updateGameState ({ commit, state, getters }) {
            if (state.game.state === 'exit' && getters.allUnitsOnExits) {
                commit('updateState', 'win')
            }
        },
        moveUnit ({ commit, state, getters }, payload) {
            let target = {};
            let wall = {};
            switch(payload.direction) {
                case 'up':
                    wall.column = payload.unit.column
                    wall.row = payload.unit.row - 1
                    target.column = payload.unit.column
                    target.row = payload.unit.row - 2
                    break
                case 'down':
                    wall.column = payload.unit.column
                    wall.row = payload.unit.row + 1
                    target.column = payload.unit.column
                    target.row = payload.unit.row + 2
                    break
                case 'left':
                    wall.column = payload.unit.column - 1
                    wall.row = payload.unit.row
                    target.column = payload.unit.column - 2
                    target.row = payload.unit.row
                    break
                case 'right':
                    wall.column = payload.unit.column + 1
                    wall.row = payload.unit.row
                    target.column = payload.unit.column + 2
                    target.row = payload.unit.row
                    break
            }
            if (getters.isOpenTile(wall.row, wall.column) &&
                getters.isOpenTile(target.row, target.column)) {
                commit('moveUnit', { unit: payload.unit, row: target.row, column: target.column })
            }
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
        getNeighborWall: (state, getters) => (direction, row, column) => {
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
        allUnitsOnExits: (state, getters) => {
            return state.units.every(unit => {
                let tile = getters.getTile(unit.row, unit.column)
                return tile.type === 'exit' && tile.color === unit.color
            })
        },
    },
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
