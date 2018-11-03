<template>
    <div class="game-tile" :style="style"></div>
</template>

<script>
export default {
    name: 'GameTile',
    props: ['gameBoard', 'row', 'column'],
    computed: {
        style() {
            let size = this.gameBoard.tileSize
            let color = this.type == 'closed' ? 'darkgrey' : 'lightgrey'
            let style =  {
                'width': `${size}px`,
                'height': `${size}px`,
                'left': `${((this.row) * size)}px`,
                'top': `${((this.column) * size)}px`,
                'background-color': color,
            }
            return style
        },
        type() {
            return this.gameBoard.tiles[this.column][this.row]
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-tile {
    border: 1px dashed grey;
    position: absolute;
}
</style>
