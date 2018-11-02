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
            let style =  {
                'width': `${size}px`,
                'height': `${size}px`,
                'left': `${((this.row - 1) * size)}px`,
                'top': `${((this.column - 1) * size)}px`,
            }
            return style
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game-tile {
    background-color: lightgrey;
    border: 1px dashed grey;
    position: absolute;
}
</style>
