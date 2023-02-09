<template>
  <Designer :engine="engine" class="full-container">
  </Designer>
</template>

<script setup lang="ts">

import {Designer} from "@/components/vue";
import {createDesigner} from "@/components/core";

const engine = createDesigner()
</script>

<style scoped lang="less">

</style>
