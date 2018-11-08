<template>
    <div class="timer">
        <span>
            {{ countdown }} / {{ totalTime }}
        </span>
        <button v-on:click="start()">start timer!</button>
        <button v-on:click="pause()">pause timer!</button>
        <button v-on:click="reset()">reset timer!</button>
        <button v-on:click="flip()">flip timer!</button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Timer',
    props: ['countdown'],
    created: function() {
        console.log('timer created!');
    },
    mounted: function () {
        this.initduration = this.countdown;
        // this.countdown = setInterval(() => {
        //     --this.countdown
        // }, 1000)
    },

    computed: {
        ...mapState({
            //unless i can find a way to make use of this alias... inaccessible in this component's methods
            totalTime: state => state.game.timer,
       }),
    },
    methods: {
        start: function() {
            //not sure where member variables are declared
            this.timerId = setInterval(() => {
                --this.countdown
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
