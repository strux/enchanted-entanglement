<template>
    <div id="app">
        <div id="content-scaler" :style="scalerStyle">
            <div :style="contentStyle">
                <div :style="boardStyle">
                    <div class="row" v-for="(val, rowIndex) in gameBoard.rows" :key="rowIndex">
                        <game-tile v-for="(val, columnIndex) in gameBoard.columns" :row="rowIndex" :column="columnIndex" :gameBoard="gameBoard" :key="columnIndex"></game-tile>
                    </div>
                    <unit v-for="unit in units" :unit="unit" :tileSize="gameBoard.tileSize" :key="unit.color"></unit>
                </div>
                <div style="position: absolute; bottom: 0">
                    <timer v-if="gameInProgress" :game-duration="game.timer"/>
                    <unit-controls v-for="unit in units" :unit="unit" :key="unit.color"></unit-controls>
                </div>

                <div :style="overlayStyle" v-if="!gameInProgress" v-on:click="createGame()">
                    <h1 v-if="game.state === 'win'">You won!</h1>
                    <h1 v-if="game.state === 'lose'">You lost!</h1>
                    <h2>Click to start</h2>
                </div>
                <div :style="overlayStyle" v-if="game.state === 'joining'">
                    <h2>Joining game...</h2>
                </div>
                <lobby :style="overlayStyle" v-if="game.state === 'lobby'"/>
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
import Lobby from './components/Lobby.vue'

export default {
    name: 'app',
    components: {
        GameTile,
        Unit,
        UnitControls,
        Timer,
        Lobby
    },
    mixins: [mapConversions],
    beforeMount: function() {
        this.setScale()
        document.addEventListener('touchmove', function(event) {
            event = event.originalEvent || event
           event.preventDefault();
        }, false)
        window.addEventListener('hashchange', this.joinGame)
        if (window.location.hash.length > 1) {
            this.joinGame()
        }

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
            if (!this.creatingGame) {
                this.creatingGame = true
                this.$store.dispatch('createGame')
                this.creatingGame = false
            }
        },
        joinGame() {
            this.$store.dispatch('joinGame')
        },
        updateState() {
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
            gameBoard: state => state.game.board,
            units: state => state.game.units,
       }),
       ...mapGetters({
           gameInProgress: 'gameInProgress'
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
    overflow: hidden;
    position: fixed;
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
