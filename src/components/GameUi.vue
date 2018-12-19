<template>
    <div class="game-ui">
        <!--
        <timer v-if="gameInProgress" :game-duration="gameDuration"/>
        -->
        <div :style="backgroundStyle"></div>
        <div :style="timerStyle"></div>
        <div :style="alertStyle"></div>
        <div  style="position: absolute; left: 547px; top: 18px;">
            <unit-controls v-for="unit in units" :unit="unit" :key="'control' + unit.id"></unit-controls>
        </div>
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
        timerStyle() {
            return  {
                position: 'absolute',
                left: '10px',
                top: '18px',
                width: '508px',
                height: '114px',
                backgroundImage: `url(${require('../assets/ui_spritesheet.png')})`,
                backgroundPosition: '0px -412px',
            }
        },
        alertStyle() {
            return  {
                position: 'absolute',
                left: '10px',
                top: '151px',
                width: '508px',
                height: '116px',
                backgroundImage: `url(${require('../assets/ui_spritesheet.png')})`,
                backgroundPosition: '0px -294px',
            }
        },
        button1Style() {
            return  {
                position: 'absolute',
                left: '547px',
                top: '19px',
                width: '237px',
                height: '116px',
                backgroundImage: `url(${require('../assets/ui_spritesheet.png')})`,
                backgroundPosition: '-511px -294px',
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
