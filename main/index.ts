// import './index.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.ts'
window.page = new Vue({
    render: h => h(App),
    router
}).$mount('#app')