import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import Vuex from 'vuex'
import { store } from './store/store'
const fb = require('./services/firebase.js')
Vue.config.productionTip = false
const cors = require('cors')({ origin: "*", credentials: true });
Vue.use(Vuex)
let app
fb.auth.onAuthStateChanged(user => {

    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        }).$mount('#app')
    }
})

