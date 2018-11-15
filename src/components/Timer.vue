<!-- Note: BEN NOTEs are keywords that are for Ben to look at and judge-->
<template>
    <div class="timer">

        <p class="timertext" :style="style">
            Timer: {{ countDown }} out of {{ gameDuration }}
        </p>

        <button v-on:click="pause()" :style="buttonstyle">pause timer!</button>
        <button v-on:click="reset()" :style="buttonstyle">reset timer!</button>
        <button v-on:click="flip()" :style="buttonstyle">flip timer!</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Timer',
    props: ['gameDuration'],
    created: function() {
    },
    data: function() {
        return {
            countDown: this.gameDuration  //Sandra: This will create a local instance of the duration for decrementing
        }
    },
    mounted: function () {
        this.start();
    },
    computed: {
        ...mapState({
            gameState: state => state.game, //Sandra: You can access this as this.gameState in methods or gameState in templates
       }),

        style() {
            return  {
                'width': '860px',
                'height': '120px',
                'margin': 'auto',
                'font-size': '60px'
            }
        },
        buttonstyle() {
            return  {
                'width': '260px',
                'height': '120px',
                'margin': '3px',
                'font-size': '30px'
            }
        },
    },
    methods: {
        start: function() {
            this.timerId = setInterval(() => {
                --this.countDown
                if (this.countDown === 0) {
                    this.$store.dispatch('loseGame');
                    this.pause();
                }
            }, 1000)
        },
        reset: function() {
            this.countDown = this.gameDuration;
        },
        flip: function() {
            this.countDown = this.gameDuration - this.countDown;
        },
        pause: function() {
            clearInterval(this.timerId);
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
