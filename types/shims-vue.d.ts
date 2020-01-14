declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
// 扩充
declare module 'vue/types/vue' {
  import Vue from 'vue';
  import VueRouter,{ Route } from 'vue-router';
  interface Vue {
    $router: VueRouter,
    $route: Route
  }
}