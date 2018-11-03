<template>
    <div id="app">
        <div :style="boardStyle">
            <div class="row" v-for="(column, columnIndex) in gameBoard.tiles">
                <game-tile v-for="(row, rowIndex) in column" :row="rowIndex" :column="columnIndex" :gameBoard="gameBoard"></game-tile>
            </div>
            <unit v-for="unit in units" :unit="unit" :tileSize="gameBoard.tileSize"></unit>
        </div>
        <unit-controls v-for="unit in units" :unit="unit"></unit-controls>
        <div :style="bannerStyle" v-if="game.state === 'pending'">
            <button v-on:click="game.state = 'play'">Start Game</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import GameTile from './components/GameTile.vue'
import Unit from './components/Unit.vue'
import UnitControls from './components/UnitControls.vue'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
        UnitControls,
    },
    methods: {
    },
    computed: {
        bannerStyle() {
            let style = {
                'width': `${this.columns * this.gameBoard.tileSize}px`,
                'height': `${this.rows * this.gameBoard.tileSize}px`,
                'background-color': 'grey',
                'border': '1px solid black',
                'position': 'absolute',
                'top': 0,
            }
            return style
        },
        boardStyle() {
            let style = {
                'width': `${this.columns * this.gameBoard.tileSize}px`,
                'height': `${this.rows * this.gameBoard.tileSize}px`,
                'position': 'relative',
            }
            return style
        },
        ...mapState({
            game: state => state.game,
            gameBoard: state => state.gameBoard,
            units: state => state.units,
       }),
       ...mapGetters({
           columns: 'getBoardColumns',
           rows: 'getBoardRows',
       }),
    },
}
</script>

<style>
body, html {
    /*
    margin: 0;
    padding: 0;
    */
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
}
.row {
    position: relative;
}
</style>
