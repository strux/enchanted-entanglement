<template>
    <div id="app">
        <div :style="boardStyle">
            <div class="row" v-for="(column, columnIndex) in gameBoard.tiles">
                <game-tile v-for="(row, rowIndex) in column" :row="rowIndex" :column="columnIndex" :gameBoard="gameBoard"></game-tile>
            </div>
            <unit :unit="units.green" :tileSize="gameBoard.tileSize"></unit>
        </div>
        <button v-on:click="moveUnitRequest('green', 'up')">Up</button>
        <button v-on:click="moveUnitRequest('green', 'down')">Down</button>
        <button v-on:click="moveUnitRequest('green', 'left')">Left</button>
        <button v-on:click="moveUnitRequest('green', 'right')">Right</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GameTile from './components/GameTile.vue'
import Unit from './components/Unit.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
    },
    methods: {
        moveUnitRequest(color, direction) {
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
            if (this.isOpenTile(target)) {
                unit.row = target.row
                unit.column = target.column
            }
        },
        validTarget(target) {
            if (typeof this.gameBoard.tiles[target.row] === 'undefined' ||
                typeof this.gameBoard.tiles[target.row][target.column] === 'undefined' ||
                this.gameBoard.tiles[target.row][target.column] === 'closed'
                ) {
                return false;
            }
            return true;
        },
    },
    computed: {
        boardStyle() {
            let style = {
                'width': `${this.columns * this.gameBoard.tileSize}px`,
                'height': `${this.rows * this.gameBoard.tileSize}px`,
            }
            return style
        },
        ...mapState({
            gameBoard: state => state.gameBoard,
            units: state => state.units,
       }),
       ...mapGetters({
           columns: 'getBoardColumns',
           rows: 'getBoardRows',
           isOpenTile: 'isOpenTile',
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
