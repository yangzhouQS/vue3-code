import {createRouter, createWebHashHistory} from 'vue-router';
import Demo from 'pages/demo.vue';
import Test from '@/pages/demo-test';
// import {MonacoEditor} from "@/pages/monaco-editor";
import {ScrollBar} from "@/pages/scroll/scroll";
import Tabs from "@/pages/tabs/tabs.vue";
import {DesignerView} from "@/pages/frame/builtin-simulator";
import {TestEmit} from "@/pages/emit/emit";
import {Formily} from "@/pages/formily/formily";
import {HocRender} from "@/pages/hoc-render/hoc-render";
import {VmUpdate} from "@/pages/vm-update";
import {SpaceContainer} from "@/pages/space/space";
import {GraphDemo} from "@/pages/graph-test/graph-demo";
import {GeneratorCode} from "@/pages/generator-code";
import {DemoProxy} from "@/pages/demo-proxy/demo-proxy";
import {ScenaRuler} from "@/pages/scena-ruler/scena-ruler";
import {gesto} from "@/pages/scena-ruler/gesto";
import {TablePage} from "@/pages/table/table";
import Dropdown from "@/pages/dropdown/dropdown.vue";
import {FlowPage} from "@/pages/flow/flow";
import {MainPage} from "@/pages/main-page";
import {LogicFlow} from "@/pages/logicFlow/logicFlow";
import {UnocssPage} from "@/pages/unocss-page/unocss-page";
import {ChartPage} from "@/pages/chart/chart";
import {HocPage} from "@/pages/hoc/hoc";
import {DemoRefs} from "@/pages/demmo-refs/demo-refs";
import {TestSelect} from "@/pages/select/test-select";
import TreeDemo from "@/pages/tree/tree-demo.vue";
import {DemoPopover} from "@/pages/demo-popover/demo-popover";
import {VuetifyDemoJsx} from "@/pages/vutify-demo/vuetify-demo.jsx";
import {DemoArcoDesign} from "@/pages/demo-arco-design/demo-arco-design";

export const routes = [
  {path: '/', component: MainPage},
  {path: '/formily', component: Formily, title: "formily配置"},
  {path: '/emit', component: TestEmit},
  {path: '/demo', component: Demo},
  {path: '/test', component: Test},
  // {path: '/monaco-editor', component: MonacoEditor, title: '代码编辑器'},
  {path: '/scroll', component: ScrollBar, title: '滚动条'},
  {path: '/tabs', component: Tabs, title: "tabs组件"},
  {path: '/frame', component: DesignerView, title: "frame测试"},
  {path: '/hoc-render', component: HocRender, title: "组件hoc"},
  {path: '/vm-update', component: VmUpdate, title: "组件更新"},
  {path: '/space', component: SpaceContainer, title: "space仿写"},
  {path: '/graph-demo', component: GraphDemo, title: "graph图结构"},
  {path: '/generator-code', component: GeneratorCode, title: "代码生成"},
  {path: '/demo-proxy', component: DemoProxy, title: "代理"},
  {path: '/scena-ruler', component: ScenaRuler},
  {path: '/gesto', component: gesto},
  {path: '/table-page', component: TablePage, title: "表格"},
  {path: '/dropdown', component: Dropdown, title: "下拉菜单调试"},
  {path: '/flow-page', component: FlowPage, title: "BPMN"},
  {path: '/LogicFlow', component: LogicFlow, title: "LogicFlow"},
  {path: '/UnocssPage', component: UnocssPage, title: "UnocssPage"},
  {path: '/chart-page', component: ChartPage, title: "ChartPage"},
  {path: '/hoc-page', component: HocPage, title: "HocPage"},
  {path: '/demo-refs', component: DemoRefs, title: "DemoRefs"},
  {path: '/TestSelect', component: TestSelect, title: "TestSelect"},
  {path: '/tree-demo', component: TreeDemo, title: "TreeDemo"},
  {path: '/popover-demo', component: DemoPopover, title: "DemoPopover"},
  {path: '/vuetify-demo', component: VuetifyDemoJsx, title: "VuetifyDemoJsx"},
  {path: '/demo-arco-design', component: DemoArcoDesign, title: "DemoArcoDesign"},
]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default {}
