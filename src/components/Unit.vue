<template>
    <div class="unit-container" :style="containerStyle">
        <div class="unit" :style="style"></div>
    </div>
</template>

<script>
export default {
    name: 'Unit',
    props: ['unit', 'size'],
    computed: {
        containerStyle() {
            let style =  {
                'width': `${this.size}px`,
                'height': `${this.size}px`,
                'top': `${((this.unit.row - 1) * this.size)}px`,
                'left': `${((this.unit.column - 1) * this.size)}px`,
            }
            return style
        },
        style() {
            let size = this.size * 0.8
            let style =  {
                'background-color': this.unit.color,
                'width': `${size}px`,
                'height': `${size}px`,
                'top': `${(this.size - size) / 2}px`,
                'left': `${(this.size - size) / 2}px`,
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
