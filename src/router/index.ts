import {createRouter, createWebHashHistory} from 'vue-router';
import Home from 'pages/home.vue';
import Demo from 'pages/demo.vue';
import Test from '@/pages/demo-test';
import DemoSlot from 'pages/demo-slot.vue';
import {MonacoEditor} from "@/pages/monaco-editor";
import {ScrollBar} from "@/pages/scroll/scroll";
import Tabs from "@/pages/tabs/tabs.vue";
import {DesignerView} from "@/pages/frame/builtin-simulator";
import {TestEmit} from "@/pages/emit/emit";
import {Formily} from "@/pages/formily/formily";
import {HocRender} from "@/pages/hoc-render/hoc-render";
import {VmUpdate} from "@/pages/vm-update";
import {SpaceContainer} from "@/pages/space/space";

const routes = [
  {path: '/', component: Home},
  {path: '/formily', component: Formily},
  {path: '/emit', component: TestEmit},
  {path: '/demo', component: Demo},
  {path: '/test', component: Test},
  {path: '/demo-slot', component: DemoSlot},
  {path: '/monaco-editor', component: MonacoEditor},
  {path: '/scroll', component: ScrollBar},
  {path: '/tabs', component: Tabs},
  {path: '/frame', component: DesignerView},
  {path: '/hoc-render', component: HocRender},
  {path: '/vm-update', component: VmUpdate},
  {path: '/space', component: SpaceContainer},
]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default {}
