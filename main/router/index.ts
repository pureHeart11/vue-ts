
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default  new VueRouter({
    mode: 'history',
    // base:'/dist',
    routes: [
        {
            name: "no",
            path: '/no',
            component: ()=> import("../pages/no.vue")
        }
    ]
})
