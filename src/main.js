import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import mapTiles from './data/Map.js'

Vue.config.productionTip = false
Vue.use(Vuex);

const initialState = {
    game: {
        state: 'pending',
        timer: 30,
    },
    gameBoard: {
        tileSize: 89,
        tiles: mapTiles,
    },
    units: [
        {
            id: 1,
            color: 'red',
            row: 11,
            column: 11,
        },
        {
            id: 2,
            color: 'green',
            row: 13,
            column: 11,
        },
    ],
}

const store = new Vuex.Store({
    state: initialState,
    mutations: {
        updateState (state, stateName) {
            state.game.state = stateName
        },
        moveUnit (state, payload) {
            payload.unit.row = payload.row
            payload.unit.column = payload.column
        },
    },
    actions: {
        updateGameState ({commit, state, getters}) {
            if (state.game.state === 'prize' && getters.allUnitsOnPrize) {
                commit('updateState', 'exit')
            }
            if (state.game.state === 'exit' && getters.allUnitsOnExit) {
                commit('updateState', 'win')
            }
        },
        loseGame ({commit, state, getters}) {
            commit('updateState', 'lose')  //<-- BEN NOTE: am i doing this right?
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
        allUnitsOnType: (state, getters) => (type) => {
            return state.units.every(unit => {
                let tile = getters.getTile(unit.row, unit.column)
                return tile.type === type && tile.unitId === unit.id
            })
        },
        allUnitsOnPrize: (state, getters) => {
            return getters.allUnitsOnType('prize')
        },
        allUnitsOnExit: (state, getters) => {
            return getters.allUnitsOnType('exit')
        },
    },
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
