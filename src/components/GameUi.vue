<template>
    <div style="position: absolute; bottom: 0">
        <timer v-if="gameInProgress" :game-duration="gameDuration"/>
        <unit-controls v-for="unit in units" :unit="unit" :key="'control' + unit.id"></unit-controls>
    </div>
</template>

<script>
import UnitControls from './UnitControls.vue'
import Timer from './Timer.vue'

export default {
    name: 'GameUi',
    props: ['units', 'gameDuration', 'gameInProgress'],
    components: {
        UnitControls,
        Timer,
    },
    data: function() {
        return {
        }
    },
    computed: {
        style() {
            return  {
            }
        },
    },
    methods: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
