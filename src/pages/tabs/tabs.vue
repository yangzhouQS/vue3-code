<template>
  <el-tabs v-model="activeName" class="demo-tabs"
           @tab-change="onChange"
           :ref="mountTabs"
  >
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import {ref, defineComponent, getCurrentInstance, nextTick} from 'vue'

export default defineComponent({
  name: 'tabs',
  props: {},
  setup() {
    const activeName = ref('second')
    const onChange = (name: string) => {
      console.log(name)
    }
    let {proxy} = getCurrentInstance();

    const mountTabs = (dom: HTMLElement) => {
      nextTick(() => {
        if (dom && proxy.$el) {
          let nodeList = proxy.$el.childNodes
          if (nodeList && nodeList.length === 2) {
            const tabsHeader = nodeList[0]!

            const tabItems = tabsHeader.querySelectorAll('.el-tabs__item.is-top')
            if (tabItems && tabItems.length > 0) {
              let index = -1;
              for (const tabItem of tabItems) {
                ++index;
                const classList = Array.from(tabItem.classList)
                if (classList.includes('is-active')) {
                  break
                }
              }
            }
          }
        }
      })
    }
    return {
      mountTabs,
      onChange,
      activeName
    }
  }
})
</script>

<style lang="scss">

</style>
