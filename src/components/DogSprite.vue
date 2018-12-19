<template>
    <div class="dog" v-on:click="blink">
        <div class="dogHead">
            <div class="dogBlink"></div>
        </div>
        <div class="dogBody"></div>
    </div>
</template>

<script>

export default {
    name: 'DogSprite',
    props: [],
    components: {
    },
    data: function() {
        return {
        }
    },
    mounted: function() {
        let breath = 400;
        let pantTime =    { easing: 'steps(4)', duration: 333,     iterations: Infinity }
        let sit2runTime = { easing: 'steps(3)', duration: 250,     iterations: 1 }
        let runTime =     { easing: 'steps(4)', duration: breath,  iterations: Infinity, delay: 250 }

        this.$el.getElementsByClassName('dogBody')[0].animate([
                { backgroundPositionX: '0px' },
                { backgroundPositionX: '-140px' },
                { backgroundPositionX: '-280px' },
                { backgroundPositionX: '-420px' }
            ], sit2runTime);

        this.$el.getElementsByClassName('dogBody')[0].animate([
                { backgroundPositionX: '-420px' },
                { backgroundPositionX: '-560px' },
                { backgroundPositionX: '-700px' },
                { backgroundPositionX: '-840px' },
                { backgroundPositionX: '-420px' }
            ], runTime);

        this.$el.getElementsByClassName('dogHead')[0].animate([
                { top: '49px'},
                { top: '55px'}
            ], sit2runTime);

        this.$el.getElementsByClassName('dogHead')[0].animate([
                { top: '55px'},
                { top: '59px'},
                { top: '54px'},
                { top: '60px'},
                { top: '55px'}
            ], runTime);

        this.$el.getElementsByClassName('dogHead')[0].animate([
                { backgroundPositionX: '-128px' },
                { backgroundPositionX: '-256px' },
                { backgroundPositionX: '-384px' },
                { backgroundPositionX: '-512px' },
                { backgroundPositionX: '-128px' }
            ], pantTime);
    },
    computed: {
    },
    methods: {
        blink() {
            let blinkTime =  { easing: 'steps(5)', duration: 498, iterations: 1 }
            let el = this.$el.getElementsByClassName('dogBlink')[0]
            el.animate([
                { backgroundPositionX: '0px'    },
                { backgroundPositionX: '-128px' },
                { backgroundPositionX: '-256px' },
                { backgroundPositionX: '-384px' },
                { backgroundPositionX: '-256px' },
                { backgroundPositionX: '0px'    }
            ], blinkTime);
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .dog {
        width: 160px;
        height: 256px;
        position: relative;
        display: inline-block;
    }
    .dogHead {
        width: 128px;
        height: 128px;
        transform-origin: 50% 90%;
        background: url('../assets/pug_head_sheet_0.png') left top;
        position: absolute;
        z-index: 2;
        left: 16px;
        top: 59px; /*top: 49px sitting height*/
    }
    .dogBlink {
        width: 128px;
        height: 128px;
        background: url('../assets/pug_head_sheet_0.png') left top;
        background-position-y: -128px;
        position: absolute;
        z-index: 3;
        left: 0px;
        top: 0px;
    }
    .dogBody {
        width: 140px;
        height: 150px;
        transform-origin: 50% 90%;
        background: url('../assets/pug_body_sheet_0.png') left top;
        position: absolute;
        left: 9px;
        top: 102px;
    }
</style>
