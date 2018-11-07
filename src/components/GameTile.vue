<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
import mapConversions from '../mixins/MapConversions.js'
export default {
    name: 'GameTile',
    props: ['gameBoard', 'row', 'column'],
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
                    'background-color': this.backgroundColor,
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
        backgroundColor() {
            let color
            switch(this.type) {
                case 1:
                    color = 'grey'
                    break
                case 2:
                    color = 'lightcoral'
                    break
                default:
                    color = 'gainsboro'
                    break
            }
            return color
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
            let style = 'none'
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
            if (tile === 1) {
                style = '1px solid gray'
            } else {
                style = '1px dashed lightgray'
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
