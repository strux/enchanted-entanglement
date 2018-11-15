<template>
    <div id="app">
        <div id="content-scaler" :style="scalerStyle">
            <div :style="contentStyle">
                <div :style="boardStyle">
                    <div class="row" v-for="(row, rowIndex) in gameBoard.tiles">
                        <game-tile v-for="(tile, columnIndex) in row" :row="rowIndex" :column="columnIndex" :tile="tile" :gameBoard="gameBoard"></game-tile>
                    </div>
                    <unit v-for="unit in units" :unit="unit" :tileSize="gameBoard.tileSize"></unit>
                </div>
                <div style="position: absolute; bottom: 0">
                    <timer v-if="game.state === 'prize' || game.state === 'exit'" :game-duration="game.timer"/>
                    <unit-controls v-for="unit in units" :unit="unit"></unit-controls>
                </div>
                <div :style="overlayStyle" v-if="game.state === 'pending' || game.state === 'win' || game.state ==='lose'" v-on:click="createGame()">
                    <h1 v-if="game.state === 'win'">You won!</h1>
                    <h1 v-if="game.state === 'lose'">You lost!</h1>
                    <h2>Click to start</h2>
                </div>
            </div>
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
import Timer from './components/Timer.vue'
import db from './database/firestore.js'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
        UnitControls,
        Timer,
    },
    mixins: [mapConversions],
    beforeCreate: function() {
        //this.$store.commit({ type:'createGameBoard', rows: 4, columns: 6 })
    },
    beforeMount: function() {
        this.setScale()
        // This is buggy
        window.addEventListener('resize', this.setScale)
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.setScale)
    },
    data: function() {
        return {
            scale: null,
            creatingGame: false,
        }
    },
    methods: {
        setScale() {
            this.scale = Math.min((window.innerWidth / 1079), (window.innerHeight / 1920))
        },
        createGame() {
            let that = this;
            if (!this.creatingGame) {
                this.creatingGame = true
                db.collection('games').add({
                    testing: 'true',
                })
                .then(this.updateState)
                .catch(function(error) {
                    console.error('Error creating game: ', error);
                });
            }
        },
        updateState(docRef) {
            console.log('Document written with ID: ', docRef.id);
            this.game.state = 'prize'
            this.creatingGame = false
        },
    },
    computed: {
        scalerStyle () {
            return {
                'width': `${window.innerWidth}px`,
                'height': `${window.innerHeight}px`,
            }
        },
        contentStyle () {
            return {
                'width': '1070px',
                'height': '1920px',
                'transform': `translate(-50%, -50%) scale(${this.scale})`,
                'position': 'relative',
                'left': '50%',
                'top': '50%',
                'transform-origin': 'center center',
                //'background-image': `url(${require('./assets/bg_test.png')})`,
            }
        },
        width () {
            return this.columns
        },
        height () {
            return this.rows
        },
        overlayStyle() {
            let backgroundColor = this.game.state === 'win' ? 'green' : 'gray'
            let style = {
                'background-color': backgroundColor,
                'width': '100%',
                'height': '100%',
                'border': '1px solid black',
                'position': 'absolute',
                'top': 0,
                'text-align': 'center',
                'font-size': '50px',
            }
            return style
        },
        boardStyle() {
            let style = {
                'width': `${this.screenWidth * this.gameBoard.tileSize}px`,
                'height': `${this.screenHeight * this.gameBoard.tileSize}px`,
                'position': 'relative',
                'background-color': 'hsl(0, 0%, 90%)',
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
    margin: 0;
    padding: 0;
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
#content-scaler  {
    position: relative;
}
</style>
