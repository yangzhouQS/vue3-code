<template>
  <div class="d-flex full-container">
    <div class="left d-flex" :ref="registerAdditive">
      <div class="item snippet" :key="item.title" v-for="item in list" :data-id="`node-${item.id}`">
        {{ item.title }}
      </div>
    </div>
    <div class="container flex-1 pa-4" id="container">
      <div class="workspace" :ref="mountContext">

      </div>
      <drag-ghost :dragon="dragon"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, nextTick, onMounted, Ref} from 'vue'
import {Dragon} from "@/components/dragon/dragon";
import {SimulatorHost} from "@/components/dragon/host";
import {DragGhost} from "@/components/dragon/designer/drag-ghost/drag-ghost";

const dragon = new Dragon()
const host = new SimulatorHost()
const list = ref([
  {id: 1, title: "图片"},
  {id: 2, title: "按钮"},
  {id: 3, title: "表格"},
  {id: 4, title: "图像"},
  {id: 5, title: "分割线"},
])

const click = (e: Event) => {
  console.log('click')
};
onMounted(() => {
  nextTick(() => {
  })
})


// methods

// 画布区域拖拽处理
const mountContext = (dom: HTMLElement | null) => {
  host.mountContent(dom)
}


// 组件拖拽发起
const registerAdditive = (shell: HTMLElement) => {
  if (!shell) {
    return;
  }


  function getSnippetId(elem: any) {
    if (!elem) {
      return null;
    }
    while (shell !== elem) {
      if (elem.classList.contains('snippet')) {
        return elem.dataset.id;
      }
      elem = elem.parentNode;
    }
    return null;
  }


  const click = (e: Event) => {
    console.log('shell node - click')
  };

  shell.addEventListener('click', click);

  // 绑定拖拽事件
  dragon.from(shell, (e: Event) => {
    const id = getSnippetId(e.target);
    if (!id) {
      return;
    }
    const dragTarget = {
      type: 'nodedata',
      data: {
        componentName: id
      },
    };
    return dragTarget;
  })
}

</script>
<style scoped>
.left {
  width: 220px;
  border: 1px solid #646cff;
  flex-wrap: wrap;
}

.left .item {
  width: 33.333%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  flex-grow: 0;
  flex-shrink: 0;

  border-right: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 0 0 0 rgb(0 0 0 / 15%);
  transition: box-shadow 0.2s ease;
}

.left .item:hover {
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 15%);
  border-color: transparent;
}

.container {
  border: 1px solid red;
  position: relative;
}

.workspace {
  position: absolute;
  left: 20px;
  top: 20px;
  right: 20px;
  bottom: 20px;
  background: #e3dfdf;
}

</style>
