<template>
    <div id="app">
        <div :style="boardStyle">
            <div class="row" v-for="row in gameBoard.rows">
                <game-tile v-for="column in gameBoard.columns" :row="row" :column="column" :gameBoard="gameBoard"></game-tile>
            </div>
        </div>
        <unit :unit="units.green" :size="gameBoard.tileSize"></unit>
        <button v-on:click="tryMoveUnit('green', 'up')">Up</button>
        <button v-on:click="tryMoveUnit('green', 'down')">Down</button>
        <button v-on:click="tryMoveUnit('green', 'left')">Left</button>
        <button v-on:click="tryMoveUnit('green', 'right')">Right</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GameTile from './components/GameTile.vue'
import Unit from './components/Unit.vue'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
    },
    methods: {
        tryMoveUnit(color, direction) {
            let unit = this.units[color];
            let target = {};
            switch(direction) {
                case 'up':
                    target.column = unit.column
                    target.row = unit.row - 1
                    break
                case 'down':
                    target.column = unit.column
                    target.row = unit.row + 1
                    break
                case 'right':
                    target.column = unit.column + 1
                    target.row = unit.row
                    break
                case 'left':
                    target.column = unit.column - 1
                    target.row = unit.row
                    break
            }
            unit.row = target.row
            unit.column = target.column
        },
    },
    computed: {
        boardStyle() {
            let style = {
                'width': `${this.gameBoard.columns * this.gameBoard.tileSize}px`,
                'height': `${this.gameBoard.rows * this.gameBoard.tileSize}px`,
            }
            return style
        },
        ...mapState({
            gameBoard: state => state.gameBoard,
            units: state => state.units,
       })
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
