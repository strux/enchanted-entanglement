import Vue from 'vue'
import Vuex from 'vuex'
import db from './firestore.js'
import mapTiles from '../data/Map.js'

Vue.use(Vuex)

const newGameState = {
    id: null,
    state: 'prize',
    timer: 1200,
    board: {
        tileSize: 89,
        rows: 25,
        columns: 25,
        tiles: mapTiles,
    },
    units: {
        1: {
            id: 1,
            color: 'red',
            row: 11,
            column: 11,
        },
        2: {
            id: 2,
            color: 'green',
            row: 13,
            column: 13,
        },
    },
}
export default new Vuex.Store({
    state: {
        game: {
            id: null,
            state: 'pending',
            timer: 1200,
            board: {
                tiles: [],
            },
            units: [],
            flippable: false,
            activeTimeTiles: [],
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
        createGame (state, newGameState) {
            let clonedState = JSON.parse(JSON.stringify(newGameState))
            state.game = clonedState
        },
        updateGameId (state, gameId) {
            state.game.id = gameId
        },
        updateGameState (state, stateName) {
            state.game.state = stateName
        },
        moveUnit (state, payload) {
            payload.unit.row = payload.row
            payload.unit.column = payload.column
        },
        saveActiveTimeTilePos (state, payload) {
        },
    },
    actions: {
        async createGame ({state, commit}) {
            try {
                commit('updateGameState', 'joining')
                let boardRef = await db.collection('boards').add({ ...newGameState.board, tiles: JSON.stringify(newGameState.board.tiles) })
                let gameRef = await db.collection('games').add({
                    state: newGameState.state,
                    units: newGameState.units,
                    boardId: boardRef.id,
                })
                commit('createGame', {...newGameState, id: gameRef.id})
                localStorage.setItem(state.game.id, 1)
                window.location.hash = state.game.id
            }
            catch(error) {
                // eslint-disable-next-line
                console.error('Error creating game: ', error)
            }
        },
        async joinGame ({commit, state}) {
            commit('updateGameState', 'joining')
            commit('updateGameId', window.location.hash.substring(1))
            let gameDocRef = db.collection('games').doc(state.game.id)

            // If you didn't get assigned an id when creating, you are second player
            let playerId = localStorage.getItem(state.game.id)
            state.playerId = playerId ? parseInt(playerId) : 2

            try {
                let gameDoc = await gameDocRef.get()
                let boardDoc = await db.collection('boards').doc(gameDoc.data().boardId).get()
                state.game.board = { ...boardDoc.data(), tiles: JSON.parse(boardDoc.data().tiles) }
            }
            catch(error) {
                // eslint-disable-next-line
                console.error('Error joining game: ', error)
            }

            gameDocRef.onSnapshot(function(gameDoc) {
                state.game.state = gameDoc.data().state
                state.game.units = gameDoc.data().units
            })
        },
        updateGameState ({commit, state, getters}) {
            let newState = null
            if (state.game.state === 'prize' && getters.allUnitsOnPrize) {
                newState = 'exit'
            }
            if (state.game.state === 'exit' && getters.allUnitsOnExit) {
                newState = 'win'
            }
            if (newState) {
                commit('updateGameState', newState)
                db.collection('games').doc(state.game.id).update({ state: newState })
                // eslint-disable-next-line
                .catch((error) => console.error('Error updating game state: ', error))
            }
        },
        loseGame ({commit}) {
            commit('updateGameState', 'lose')
        },
        flippedTimer ({commit}) {
            let timeTile = activeTimeTiles.shift()
            let tile = this.getTile(timeTile.column, timeTile.row)
            tile.type = 'floor'
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
                db.collection('games').doc(state.game.id).update({[`units.${payload.unit.id}`]: state.game.units[payload.unit.id]})
                // eslint-disable-next-line
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
            return Object.values(state.game.units).some(unit => unit.row === row && unit.column === column)
        },
        isOpenTile: (state, getters) => (row, column) => {
            let tile = getters.getTile(row, column)
            return tile.collide === false &&
                   tile !== undefined &&
                   !getters.isUnitOnTile(row, column)
        },
        allUnitsOnType: (state, getters) => (type) => {
            return Object.values(state.game.units).every(unit => {
                let tile = getters.getTile(unit.row, unit.column)
                return tile.type === type && tile.unitId === unit.id
            })
        },
        unitOnType: (state, getters) => (type) => {
            return state.game.units.some(unit => {
                let tile = getters.getTile(unit.row, unit.column)
                return tile.type === type
            })
        },
        allUnitsOnPrize: (state, getters) => {
            return getters.allUnitsOnType('prize')
        },
        allUnitsOnExit: (state, getters) => {
            return getters.allUnitsOnType('exit')
        },
        unitOnTimeTile: (state, getters) => {
            return getters.unitOnType('time')
        },
        getTilesOfType: (state, getters) => (type) => {
            let tilesOfType = []
            state.game.units.forEach(unit => {
                let tile = getters.getTile(unit.row, unit.column)
                if (tile.type === type) {
                    tilesOfType.push(unit.row, unit.column)
                }
            })
            return tilesOfType
        },
        gameInProgress(state) {
            let gameState = state.game.state
            return gameState === 'prize' || gameState === 'exit'
        },
    },
})

