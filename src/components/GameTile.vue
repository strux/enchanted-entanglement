<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
import mapConversions from '../mixins/MapConversions.js'
import { mapGetters } from 'vuex'

export default {
    name: 'GameTile',
    props: ['gameBoard', 'row', 'column', 'tile'],
    mixins: [mapConversions],
    computed: {
        style() {
            if (!this.isWallCoord(this.row, this.column)) {
                let size = this.gameBoard.tileSize
                let style = {
                    'width': `${size}px`,
                    'height': `${size}px`,
                    'left': `${this.screenColumn * size}px`,
                    'top': `${this.screenRow * size}px`,
                    'background-color': this.tile.style['background-color'],
                    'border-top': this.wallStyle('top'),
                    'border-bottom': this.wallStyle('bottom'),
                    'border-left': this.wallStyle('left'),
                    'border-right': this.wallStyle('right'),
                }
                return style
            } else {
                return { 'display': 'none' }
            }
        },
       ...mapGetters(['getWall']),
    },
    methods: {
        isWallCoord(row, column) {
            return row % 2 === 0 || column % 2 === 0
        },
        wallStyle(direction) {
            let neighbor = this.getWall(direction, this.row, this.column)
            let style = neighbor.type === 'wall' ? '1px solid gray' : '1px dashed lightgray'
            return style
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-tile {
    box-sizing: border-box;
    position: absolute;
}
</style>
