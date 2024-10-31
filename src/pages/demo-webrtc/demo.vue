<template>
  <div>
    <el-select v-model="model" placeholder="placeholder">
      <el-option
        v-for="item in optionsList"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "demo",
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {
  },
  methods: {
    loadData() {
    }
  },
}
</script>

<style lang="scss">

</style>
