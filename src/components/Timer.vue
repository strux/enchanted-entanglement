<template>
    <div class="timer" >
        <span>
            {{ currenttime }}
        </span>
        <button v-on:click="start()">start timer!</button>
        <button v-on:click="reset()">reset timer!</button>
    </div>
</template>

<script>
export default {
    name: 'Timer',
    props: ['starttime', 'currenttime'],

    created: function() {
            this.currenttime = this.starttime;

            console.log('timer created!');

            console.log('start: ' + this.starttime);
            console.log('current: ' + this.currenttime);
        },

    mutations: {

    },
    methods: {
        start: function() {
            
        },
        reset: function() {
            
        },
        flip: function() {

        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
