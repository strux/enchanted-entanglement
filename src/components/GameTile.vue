<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
export default {
    name: 'GameTile',
    props: ['gameBoard', 'row', 'column'],
    computed: {
        style() {
            if (!this.isWallCoord(this.row, this.column)) {
                let size = this.gameBoard.tileSize
                let style = {
                    'width': `${size}px`,
                    'height': `${size}px`,
                    'left': `${((Math.floor(this.row/2)) * size)}px`,
                    'top': `${((Math.floor(this.column/2)) * size)}px`,
                    'background-color': 'gainsboro',
                    'border-top': this.wallStyle('top'),
                    'border-bottom': this.wallStyle('bottom'),
                    'border-left': this.wallStyle('left'),
                    'border-right': this.wallStyle('right'),
                }
                /*
                let obj = {}
                ['top', 'bottom', 'left', 'right'].forEach((direction) => {
                    if (this.neighborTile(direction) === 1) {
                        obj[`border-${direction}`] = '2px solid black'
                    }
                }, this)
                */
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
