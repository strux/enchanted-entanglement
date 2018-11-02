<template>
    <div id="app">
        <div class="row" v-for="row in gameBoard.rows">
            <game-tile v-for="column in gameBoard.columns" :row="row" :column="column" :gameBoard="gameBoard"></game-tile>
        </div>
        <player color="green" :size="gameBoard.tileSize"  :row="1" :column="1"></player>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GameTile from './components/GameTile.vue'
import Player from './components/Player.vue'

export default {
    name: 'app',
    components: {
        GameTile,
        Player,
    },
    computed: {
        ...mapState({
            gameBoard: state => state.gameBoard
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
