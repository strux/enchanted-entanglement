<template>
    <div class="lobby">
        <p>
            I am the lobby.
            <!-- Debugging purposes -->
            {{ playerId === 1 ? 'I am the creator' : 'I am the guest'}}
        </p>
        You:
        <button v-on:click="Ready()" v-bind:disabled="pressed" :style="buttonstyle">{{ ready }}</button>
        Friend:
        <button v-bind:disabled="true" :style="buttonstyle">{{ OtherPlayerReady() ? 'ready' : 'start'}}</button>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    name: 'Lobby',
    data: function() {
        return {
            ready: 'start',
            pressed: false
        }
    },
    computed: {
        buttonstyle() {
            return  {
                'width': '360px',
                'height': '220px',
                'margin': '3px',
                'font-size': '60px'
            }
        },
        ...mapState({
            gameState: state => state.game,
            playerId: state => state.playerId
       }),
       ...mapGetters({
           getPlayerReadyStatus: 'getPlayerReadyStatus'
       }),
    },
    methods: {
        Ready() {
            this.ready = 'ready'
            this.$store.dispatch('readyPlayer', {playerId: this.playerId})
            this.pressed = true
            this.$store.dispatch('updateGameState')

        },
        OtherPlayerReady() {
            return this.getPlayerReadyStatus(this.playerId === 1 ? 2 : 1)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
