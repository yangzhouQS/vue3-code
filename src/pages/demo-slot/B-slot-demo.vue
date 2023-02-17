<template>
  <div class="B-slot-demo">
    B-slot-demo
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
