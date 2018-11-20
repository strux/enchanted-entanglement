<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
import mapConversions from '../mixins/MapConversions.js'
import { mapGetters } from 'vuex'
import { tileDict } from '../data/Map.js'

export default {
    name: 'GameTile',
    props: ['gameBoard', 'row', 'column'],
    mixins: [mapConversions],
    computed: {
        tile() {
            return this.getTile(this.row, this.column)
        },
        style() {
            if (!this.isWallCoord(this.row, this.column)) {
                let size = this.gameBoard.tileSize
                let style = {
                    ...this.dynamicStyle,
                    'width': `${size}px`,
                    'height': `${size}px`,
                    'left': `${this.screenColumn * size}px`,
                    'top': `${this.screenRow * size}px`,
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
        dynamicStyle() {
            let floorStyle = tileDict['.'].style
            if (this.getState === 'prize' && this.tile.type === 'exit') {
                return floorStyle
            }
            else if (this.getState === 'exit' && this.tile.type === 'prize') {
                return floorStyle
            } else {
                return this.tile.style
            }
        },
       ...mapGetters(['getState', 'getTile','getNeighborWall']),
    },
    methods: {
        isWallCoord(row, column) {
            return row % 2 === 0 || column % 2 === 0
        },
        wallStyle(direction) {
            let neighbor = this.getNeighborWall(direction, this.row, this.column)
            return neighbor.type === 'wall' ? '2px solid gray' : '0px'
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
