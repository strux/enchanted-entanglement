<template>
    <div class="unit-container" :style="containerStyle">
        <div class="unit" :style="style"></div>
    </div>
</template>

<script>
export default {
    name: 'Unit',
    props: ['unit', 'tileSize'],
    computed: {
        containerStyle() {
            let style =  {
                'width': `${this.tileSize}px`,
                'height': `${this.tileSize}px`,
                'top': `${((this.unit.row) * this.tileSize)}px`,
                'left': `${((this.unit.column) * this.tileSize)}px`,
            }
            return style
        },
        style() {
            let size = this.tileSize * 0.8
            let style =  {
                'background-color': this.unit.color,
                'width': `${size}px`,
                'height': `${size}px`,
                'top': `${(this.tileSize - size) / 2}px`,
                'left': `${(this.tileSize - size) / 2}px`,
            }
            return style
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.unit-container {
    position: absolute;
}
.unit {
    position: relative;
    border-radius: 50%;
}
</style>
