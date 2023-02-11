<template>
  <Designer :engine="engine" class="full-container">
    <workbench>
      hello workbench
    </workbench>
  </Designer>
</template>

<script setup lang="ts">

import {Designer} from "@/components/vue";
import {createDesigner} from "@/components/core";
import {Workbench} from "@/components/vue/containers/workbench";

const engine = createDesigner()
</script>

<style scoped lang="less">

</style>
