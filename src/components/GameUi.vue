<template>
    <div class="game-ui">
        <!--
        <timer v-if="gameInProgress" :game-duration="gameDuration"/>
        -->
        <div :style="backgroundStyle"></div>
        <unit-controls v-for="unit in units" :unit="unit" :key="'control' + unit.id"></unit-controls>
    </div>
</template>

<script>
import UnitControls from './UnitControls.vue'
//import Timer from './Timer.vue'

export default {
    name: 'GameUi',
    props: ['units', 'gameDuration', 'gameInProgress'],
    components: {
        UnitControls,
        //Timer,
    },
    data: function() {
        return {
        }
    },
    computed: {
        backgroundStyle() {
            return  {
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translate(-50%)',
                width: '1440px',
                height: '291px',
                backgroundImage: `url(${require('../assets/ui_spritesheet.png')})`,
                backgroundRepeat: 'no-repeat',
            }
        },
    },
    methods: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .game-ui {
        position: absolute;
        bottom: 0;
        width: 1080px;
        height: 291px;
    }
</style>
