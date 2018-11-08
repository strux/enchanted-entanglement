<template>
    <div id="app">
        <div :style="boardStyle">
            <div class="row" v-for="(row, rowIndex) in gameBoard.tiles">
                <game-tile v-for="(tile, columnIndex) in row" :row="rowIndex" :column="columnIndex" :tile="tile" :gameBoard="gameBoard"></game-tile>
            </div>
            <unit v-for="unit in units" :unit="unit" :tileSize="gameBoard.tileSize"></unit>
        </div>
        <unit-controls v-for="unit in units" :unit="unit"></unit-controls>
        <div :style="startScreen" v-if="game.state === 'pending'">
            <button v-on:click="game.state = 'exit'">Start Game</button>
        </div>
        <div :style="winScreen" v-if="game.state === 'win'">
            <h1>You won!</h1>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import GameTile from './components/GameTile.vue'
import Unit from './components/Unit.vue'
import UnitControls from './components/UnitControls.vue'
import mapConversions from './mixins/MapConversions.js'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
        UnitControls,
    },
    mixins: [mapConversions],
    methods: {
    },
    beforeCreate: function() {
        //this.$store.commit({ type:'createGameBoard', rows: 4, columns: 6 })
    },
    computed: {
        width () {
            return this.columns
        },
        height () {
            return this.rows
        },
        startScreen() {
            return {
                ...this.bannerStyle,
                'background-color': 'gray',
            }
        },
        winScreen() {
            return {
                ...this.bannerStyle,
                'background-color': 'green',
            }
        },
        bannerStyle() {
            let style = {
                'width': `${this.screenWidth * this.gameBoard.tileSize}px`,
                'height': `${this.screenHeight * this.gameBoard.tileSize}px`,
                'border': '1px solid black',
                'position': 'absolute',
                'top': 0,
            }
            return style
        },
        boardStyle() {
            let style = {
                'width': `${this.screenWidth * this.gameBoard.tileSize}px`,
                'height': `${this.screenHeight * this.gameBoard.tileSize}px`,
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
       ...mapMutations({
           createGameBoard: 'createGameBoard',
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
