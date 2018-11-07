<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
import mapConversions from '../mixins/MapConversions.js'
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
                    'left': `${this.screenRow * size}px`,
                    'top': `${this.screenColumn * size}px`,
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
        type() {
            return this.gameBoard.tiles[this.column][this.row]
        },
    },
    methods: {
        isWallCoord(row, column) {
            return row % 2 === 0 || column % 2 === 0
        },
        wallStyle(direction) {
            let style = '1px dashed lightgray'
            let tile
            switch(direction) {
                case 'top':
                    tile = this.gameBoard.tiles[this.column-1][this.row]
                    break
                case 'bottom':
                    tile = this.gameBoard.tiles[this.column+1][this.row]
                    break
                case 'right':
                    tile = this.gameBoard.tiles[this.column][this.row+1]
                    break
                case 'left':
                    tile = this.gameBoard.tiles[this.column][this.row-1]
                    break
            }
            if (tile.type === 'wall') {
                style = '1px solid gray'
            }
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
