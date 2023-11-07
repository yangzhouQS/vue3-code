<script setup lang="ts">
import {ArrowDown, /*Cellphone, Download, Upload*/} from '@element-plus/icons-vue'
import {ref} from 'vue'

const content = ref("hello")

const __handleCommand = (type) => {
  console.log(type);
}
/*const loading = undefined
const dropdownItem = [
  {command: "A", disabled: false, divided: false, icon: Download, content: "A"},
  {command: "B", disabled: false, divided: false, icon: Upload, content: "B"},
  {command: "C", disabled: false, divided: false, icon: Cellphone, content: "C"},
  {command: "D", disabled: false, divided: false, icon: '', content: "D"}
]*/
const renderOption={
  "modelName": "",
  "type": "default",
  "size": "default",
  "maxHeight": "",
  "disabled": false,
  "splitButton": true,
  "placement": "bottom",
  "content": "更多",
  "dropdownItem": [
    {
      "command": "downloadTemplate",
      "content": "下载模板",
      "icon": "Download",
      "disabled": false,
      "divided": false
    },
    {
      "command": "import",
      "content": "导入excel",
      "icon": "Upload",
      "disabled": false,
      "divided": false
    },
    {
      "command": "importRecord",
      "content": "导入记录",
      "icon": "Cellphone",
      "disabled": false,
      "divided": false
    }
  ],
  "display": true,
  "permissionSetting": ""
}
</script>

<template>
  <div class="d-flex align-center justify-center full-screen">
    <el-dropdown
      @command="__handleCommand"
      :size="renderOption.size"
      :type="renderOption.type"
      split-button
      :loading="renderOption.loading"
      :placement="renderOption.loading"
    >
      {{ content }}
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in renderOption?.dropdownItem"
            :key="index"
            :command="item.command"
            :disabled="item.disabled"
            :divided="item.divided"
            :icon="item.icon">
            {{ item.content }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="less">

</style>
