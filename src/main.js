import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        game: {
            state: 'play',
            timer: 30 * 1000,
        },
        gameBoard: {
            tileSize: 50,
            rows: 4,
            tiles: [
                ['closed','open','open','open'],
                ['open','open','open','open'],
                ['open','open','open','open'],
                ['open','closed','open','open'],
            ],
        },
        units: {
            red: {
                color: 'red',
                row: 1,
                column: 1,
            },
            green: {
                color: 'green',
                row: 2,
                column: 2,
            },
        },
    },
    mutations: {
        //increment: state => state.count++,
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
        isOpenTile: (state, getters) => (location) => {
            return getters.getTile(location.row, location.column) === 'open'
        },
        getBoardRows: state => {
            return state.gameBoard.tiles.length
        },
        getBoardColumns: state => {
            return state.gameBoard.tiles[0].length
        },
    }
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
