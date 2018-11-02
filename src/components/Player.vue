<template>
    <div class="player-container" :style="containerStyle">
        <div class="player" :style="style"></div>
    </div>
</template>

<script>
export default {
    name: 'Player',
    props: ['color', 'size', 'row', 'column'],
    computed: {
        containerStyle() {
            let style =  {
                'width': `${this.size}px`,
                'height': `${this.size}px`,
                'left': `${((this.row - 1) * this.size)}px`,
                'top': `${((this.column - 1) * this.size)}px`,
            }
            return style
        },
        style() {
            let size = this.size * 0.8
            let style =  {
                'background-color': this.color,
                'width': `${size}px`,
                'height': `${size}px`,
                'left': `${(this.size - size) / 2}px`,
                'top': `${(this.size - size) / 2}px`,
            }
            return style
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-container {
    position: absolute;
}
.player {
    position: relative;
    border-radius: 50%;
}
</style>
