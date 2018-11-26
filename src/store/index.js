import Vue from 'vue'
import Vuex from 'vuex'
import db from './firestore.js'
import mapTiles from '../data/Map.js'

Vue.use(Vuex)

const initialState = {
    state: 'pending',
    timer: 1200,
    board: {
        tileSize: 89,
        rows: 25,
        columns: 25,
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
            column: 13,
        },
    ],
}
export default new Vuex.Store({
    state: {
        game: {
            state: 'pending',
            timer: 1200,
            board: {
                tiles: [],
            },
            units: [],
        },
        playerId: null,
        players: [
            {
                id: 1,
                controls: ['up', 'left'],
            },
            {
                id: 2,
                controls: ['down', 'right'],
            },
        ],
    },
    mutations: {
        createGame (state, initialState) {
            state.playerId = 1
            let clonedState = JSON.parse(JSON.stringify(initialState))
            state.game = { ...clonedState, state: 'prize' }
        },
        updateState (state, stateName) {
            state.game.state = stateName
            let id = window.location.hash.substring(1)
            db.collection('games').doc(id).update({ state: state.game.state })
            .catch((error) => console.error('Error updating game state: ', error))
        },
        moveUnit (state, payload) {
            payload.unit.row = payload.row
            payload.unit.column = payload.column
        },
    },
    actions: {
        async createGame ({commit, state}) {
            try {
                commit('createGame', initialState)
                let boardRef = await db.collection('boards').add({ ...state.game.board, tiles: JSON.stringify(state.game.board.tiles) })
                let gameRef = await db.collection('games').add({
                    state: state.game.state,
                    units: state.game.units,
                    boardId: boardRef.id,
                })
                window.location.hash = '#' + gameRef.id
            }
            catch(error) {
                console.error('Error creating game: ', error)
            }
        },
        async joinGame ({commit, state}) {
            // If you didn't get assigned an id when creating, you are second player
            if (!state.playerId) {
                state.playerId = 2
            }
            let id = window.location.hash.substring(1)
            let gameDocRef = db.collection('games').doc(id)
            try {
                let gameDoc = await gameDocRef.get()
                let boardDoc = await db.collection('boards').doc(gameDoc.data().boardId).get()
                state.game.board = { ...boardDoc.data(), tiles: JSON.parse(boardDoc.data().tiles) }
            }
            catch(error) {
                console.error('Error joining game: ', error)
            }

            gameDocRef.onSnapshot(function(gameDoc) {
                state.game.state = gameDoc.data().state
                state.game.units = gameDoc.data().units
            })
        },
        updateGameState ({commit, state, getters}) {
            if (state.game.state === 'prize' && getters.allUnitsOnPrize) {
                commit('updateState', 'exit')
            }
            if (state.game.state === 'exit' && getters.allUnitsOnExit) {
                commit('updateState', 'win')
            }
        },
        loseGame ({commit}) {
            commit('updateState', 'lose')
        },
        moveUnit ({ commit, state, getters }, payload) {
            let target = {}
            let wall = {}
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

                // DRY this up
                let id = window.location.hash.substring(1)
                db.collection('games').doc(id).update({ units: state.game.units })
                .catch((error) => console.error('Error moving unit: ', error))
            }
        },
    },
    getters: {
        currentPlayer: (state) => {
            return state.players.find(player => player.id === state.playerId)
        },
        userHasControl: (state, getters) => (control) => {
            return getters.currentPlayer.controls.some(ctrl => ctrl === control)
        },
        getState: (state) => {
            return state.game.state
        },
        getTile: (state) => (row, column) => {
            let index = column + (row * state.game.board.columns)
            if (typeof state.game.board.tiles[index] === 'undefined') {
                return undefined
            } else {
                return state.game.board.tiles[index]
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
            return state.game.units.some(unit => unit.row === row && unit.column === column)
        },
        isOpenTile: (state, getters) => (row, column) => {
            let tile = getters.getTile(row, column)
            return tile.collide === false &&
                   tile !== undefined &&
                   !getters.isUnitOnTile(row, column)
        },
        allUnitsOnType: (state, getters) => (type) => {
            return state.game.units.every(unit => {
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

