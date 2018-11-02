import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        gameBoard: {
            tileSize: 50,
            rows: 4,
            columns: 4,
        },
        units: {
            green: {
                color: 'green',
                row: 2,
                column: 2,
            },
        },
    },
    mutations: {
        //increment: state => state.count++,
    }
})

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')
