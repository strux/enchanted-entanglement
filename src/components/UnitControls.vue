<template>
    <div>
        <button v-if="userHasControl('up')" v-on:click="moveUnitRequest('up')" :style="style" :disabled="disabled">&#9650;</button>
        <button v-if="userHasControl('down')" v-on:click="moveUnitRequest('down')" :style="style" :disabled="disabled">&#9660;</button>
        <button v-if="userHasControl('left')" v-on:click="moveUnitRequest('left')" :style="style" :disabled="disabled">&#9668;</button>
        <button v-if="userHasControl('right')" v-on:click="moveUnitRequest('right')" :style="style" :disabled="disabled">&#9658;</button>
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
                .then(this.$store.dispatch('updateGameState'))
        },
    },
    computed: {
        style() {
            return  {
                'width': '260px',
                'height': '120px',
                'margin': '3px',
                'background-color': this.unit.color,
                'border': '2px solid black',
                'font-size': '60px',
                'touch-action': 'manipulation',
            }
        },
       ...mapGetters({
           gameInProgress: 'gameInProgress'
       }),
        ...mapState(['game']),
        ...mapGetters(['userHasControl']),
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
