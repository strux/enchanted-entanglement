<template>
    <div>
        <button v-on:click="moveUnitRequest('up')" :style="style" :disabled="game.state !== 'play'">Up</button>
        <button v-on:click="moveUnitRequest('down')" :style="style" :disabled="game.state !== 'play'">Down</button>
        <button v-on:click="moveUnitRequest('left')" :style="style" :disabled="game.state !== 'play'">Left</button>
        <button v-on:click="moveUnitRequest('right')" :style="style" :disabled="game.state !== 'play'">Right</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: 'UnitControls',
    props: ['unit'],
    methods: {
        moveUnitRequest(direction) {
            let target = {};
            switch(direction) {
                case 'up':
                    target.column = this.unit.column
                    target.row = this.unit.row - 1
                    break
                case 'down':
                    target.column = this.unit.column
                    target.row = this.unit.row + 1
                    break
                case 'right':
                    target.column = this.unit.column + 1
                    target.row = this.unit.row
                    break
                case 'left':
                    target.column = this.unit.column - 1
                    target.row = this.unit.row
                    break
            }
            if (this.isOpenTile(target.row, target.column)) {
                this.unit.row = target.row
                this.unit.column = target.column
            }
        },
    },
    computed: {
        style() {
            return  {
                'color': this.unit.color,
            }
        },
        ...mapState({
            game: state => state.game,
       }),
       ...mapGetters({
           isOpenTile: 'isOpenTile',
       }),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
