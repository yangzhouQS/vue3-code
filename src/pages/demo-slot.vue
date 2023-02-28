<template>
  <div class="demo-slot full-container">
    <el-button type="primary" @click="onClick">点击测试</el-button>
    <!--    <a-slot-demo/>-->
    <b-slot-demo :ref="mountRef">
      <span slot="tree-title">tree - hello title</span>
      <span slot="tree-lab">tree - hello lab</span>
      <span slot="title">hello title</span>
      <span slot="name">hello name</span>
    </b-slot-demo>
    <div style="width: 600px;margin: 0 auto;">
      <div style="width: 260px;height: 100px;border: 1px solid #333333;">
        <ellipsis :text="text" :height="100" :tooltip="true">
        </ellipsis>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {observable, autorun, batch} from "@formily/reactive"
import {observer} from '@formily/reactive-vue'
import {ASlotDemo} from "@/pages/demo-slot/A-slot-demo";
import BSlotDemo from "@/pages/demo-slot/B-slot-demo.vue";
import Ellipsis from "@/components/ellipsis/ellipsis.vue";
import {ref} from 'vue'

const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci atque, dignissimos earum eius esse ex inventore itaque laboriosam laborum modi nam natus obcaecati placeat qui quos repellendus sed similique sit soluta tempora, unde vero voluptate! Aperiam, deserunt explicabo labore officiis perspiciatis placeat provident repellat sed suscipit voluptatibus. Accusamus animi aut cum, delectus ea impedit laudantium maxime modi, nisi omnis quis reiciendis totam unde? Aperiam architecto consectetur consequuntur dicta ea earum eos esse eum iste, iure laboriosam maiores maxime minima minus mollitia necessitatibus nihil non provident quae quasi quia quidem ratione repellendus, sint soluta tenetur vero voluptas voluptate voluptatem, voluptatum.')
const mountRef = (dom: HTMLLIElement | null) => {
  if (dom) {
    console.log(dom)
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
  batch(() => {
    handler()
  })
}
</script>

<style scoped lang="less">

</style>
