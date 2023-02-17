<template>
  <div class="demo-slot full-container">
    <el-button type="primary" @click="onClick">点击测试</el-button>
    <!--    <a-slot-demo/>-->
    <b-slot-demo :ref="mountRef">
      <span slot="title">hello title</span>
      <span slot="name">hello name</span>
    </b-slot-demo>
  </div>
</template>

<script setup lang="ts">
import {observable, autorun, batch} from "@formily/reactive"
import {observer} from '@formily/reactive-vue'
import {ASlotDemo} from "@/pages/demo-slot/A-slot-demo";
import BSlotDemo from "@/pages/demo-slot/B-slot-demo.vue";


const mountRef = (dom: HTMLLIElement | null) => {
  if (dom) {
    console.log(dom)
    debugger
  }
}


const obs = observable({})
const handler = () => {
  obs.aa = 123
  obs.bb = 456
}
/*autorun(() => {
  // 这样就会执行 3 次打印，autorun 默认执行一次，加上 obs.aa 赋值执行一次，obs.bb 赋值执行一次，如果原子操作更多一些
  // 执行三次
  console.log(obs.aa, obs.bb)
  // console.log(obs.aa)
})*/

autorun(() => {
  // 这样就会执行 3 次打印，autorun 默认执行一次，加上 obs.aa 赋值执行一次，obs.bb 赋值执行一次，如果原子操作更多一些
  // 执行三次
  console.log(obs.aa, obs.bb)
  // console.log(obs.aa)
})

const onClick = () => {
  // 使用 batch 模式，将更新进行合并：
  batch(() => {
    handler()
  })
}
</script>

<style scoped lang="less">

</style>
