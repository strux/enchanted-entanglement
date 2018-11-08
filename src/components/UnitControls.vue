<template>
    <div>
        <button v-on:click="moveUnitRequest('up')" :style="style" :disabled="game.state !== 'exit'">Up</button>
        <button v-on:click="moveUnitRequest('down')" :style="style" :disabled="game.state !== 'exit'">Down</button>
        <button v-on:click="moveUnitRequest('left')" :style="style" :disabled="game.state !== 'exit'">Left</button>
        <button v-on:click="moveUnitRequest('right')" :style="style" :disabled="game.state !== 'exit'">Right</button>
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
            this.$store.dispatch('moveUnit', { unit: this.unit, direction })
            // then once promise
            this.$store.dispatch('updateGameState')
        },
    },
    computed: {
        style() {
            return  {
                'color': this.unit.color,
            }
        },
        ...mapState(['game']),
        ...mapGetters(['isOpenTile']),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
