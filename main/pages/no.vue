<template>
  <div>
    no
  </div>
</template>

<script lang="ts">
import {
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Vue,
  Watch
} from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  $route: any;
  // 初始化数据
  msg = 12311;
  count = 1;
  // 声明周期钩子
  mounted() {
    console.log(this.$route);

    type myName = { name: string; age: number };

    type myChild = myName & { sex: boolean };

    let obj: myChild = {
      name: "zs",
      age: 23,
      sex: true
    };
  }
  // 计算属性
  get computedMsg() {
    return "computed " + this.msg;
  }
  handle() {
    console.log(1);
  }
}
</script>