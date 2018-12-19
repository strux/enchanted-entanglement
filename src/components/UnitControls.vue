<template>
    <div class="unitControl">
        <div v-if="userHasControl('up')" v-on:click="moveUnitRequest('up')" class="button" :style="style('up')" :disabled="!gameInProgress"></div>
        <div v-if="userHasControl('down')" v-on:click="moveUnitRequest('down')" class="button" :style="style('down')" :disabled="!gameInProgress"></div>
        <div v-if="userHasControl('left')" v-on:click="moveUnitRequest('left')" class="button" :style="style('left')" :disabled="!gameInProgress"></div>
        <div v-if="userHasControl('right')" v-on:click="moveUnitRequest('right')" class="button" :style="style('right')" :disabled="!gameInProgress"></div>
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
        style(direction) {
            let positions = {
                left1: '-511px -294px',
                right1: '-749px -294px',
                down1: '-988px -294px',
                up1: '-511px -411px',
                left2: '-749px -411px',
                right2: '-988px -411px',
                down2: '0px -527px',
                up2: '-238px -527px',
            }
            let position = positions[direction + this.unit.id]
            let backgroundPosition = position ? position : '0 0'
            return  {
                display: 'inline-block',
                width: '237px',
                height: '116px',
                backgroundImage: `url(${require('../assets/ui_spritesheet.png')})`,
                backgroundPosition: backgroundPosition,
                touchAction: 'manipulation',
            }
        },
    },
    computed: {
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
    .unitControl div:first-child {
        margin-right: 34px;
    }
    .unitControl div {
        margin-bottom: 11px;
    }
</style>
