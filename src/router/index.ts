import {createRouter, createWebHashHistory} from 'vue-router';
import Home from 'pages/home.vue';
import Demo from 'pages/demo.vue';
import Test from 'pages/test';
import DemoSlot from 'pages/demo-slot.vue';

const routes = [
  {path: '/', component: Home},
  {path: '/demo', component: Demo},
  {path: '/test', component: Test},
  {path: '/demo-slot', component: DemoSlot},
]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default {}
