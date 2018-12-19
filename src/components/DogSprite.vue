<template>
        <div class="dog">
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
    computed: {
    },
    methods: {
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
