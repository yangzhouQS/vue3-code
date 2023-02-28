<template>
  <div class="B-slot-demo">
    B-slot-demo
    <div class="tree-title">
      <slot name="tree-title"></slot>
    </div>
    <div class="tree-lab">
      <slot name="tree-lab"></slot>
    </div>
    <p class="title">
      <slot name="title">{{ title }}</slot>
    </p>
    <p class="name">
      <slot name="name">{{ name }}</slot>
    </p>
    <div class="container">
      <slot>默认的插槽数据展示</slot>
    </div>
  </div>
</template>

<script>
import pickSubCompSlots from "@/utils/pick-sub-comp-slots";
import {useSlots} from 'vue'

export default {
  name: "B-slot-demo",
  props: {
    title: [String, Number],
    name: [String, Number],
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
  },
  methods: {},
}
</script>

<style scoped lang="postcss">

</style>
