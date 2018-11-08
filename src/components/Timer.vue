<!-- Note: BEN NOTEs are keywords that are for Ben to look at and judge-->
<template>
    <div class="timer">

        <p class="timertext" :style="style">
            Timer: {{ countdown }} out of {{ totalTime }}
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
    props: ['countdown'],                    // BEN NOTE: keep my own property rather than changing the state's source of truth timer
    created: function() {
        console.log('timer created!');
    },

    mounted: function () {
        this.initduration = this.countdown;  //BEN NOTE: not sure where member variables are declared-- hence the rand assignment
        this.start();
    },
    computed: {
        ...mapState({
            //BEN NOTE: unless i can find a way to make use of this alias... inaccessible in this component's methods
            gameState: state => state.game,
            totalTime: state => state.game.timer,
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
            //adding timer id to this component
            this.timerId = setInterval(() => {
                --this.countdown
                if (this.countdown === 0) {
                    this.$store.dispatch('loseGame');
                    this.pause();
                }
            }, 1000)
        },
        reset: function() {
            //this won't work: totalTime Ref only accessible in template?? 
            //this.countdown = totalTime;
            this.countdown = this.initduration;
        },
        flip: function() {
            this.countdown = this.initduration - this.countdown;
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
