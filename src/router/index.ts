import {createRouter, createWebHashHistory} from 'vue-router';
//import Demo from 'pages/demo.vue';
import {TestEmit} from "../pages/emit/emit";
import {Formily} from "../pages/formily/formily";
import {MainPage} from "../pages/main-page";
import {DemoSearchTree} from "../pages/demo-search-tree/demo-search-tree";
import Test from '../pages/demo-test';
import {DemoHooks} from "../pages/demo-hooks/demo-hooks";
import {DemoText} from "../pages/demo-text/demo-text";
import {DemoVirtual} from "../pages/demo-virtual/demo-virtual";
import {DemoDirectives} from "../pages/demo-directives/demo-directives";
import {ScrollBar} from "../pages/scroll/scroll";
import Tabs from "../pages/tabs/tabs.vue";
import {DesignerView} from "../pages/frame/designer/designer-view";
import {HocRender} from "../pages/hoc-render/hoc-render";
import {VmUpdate} from "../pages/vm-update";
import {SpaceContainer} from "../pages/space/space";
import {GraphDemo} from "../pages/graph-test/graph-demo";
import {GeneratorCode} from "../pages/generator-code";
import {DemoProxy} from "../pages/demo-proxy/demo-proxy";
import {ScenaRuler} from "../pages/scena-ruler/scena-ruler";
import {gesto} from "../pages/scena-ruler/gesto";
import Dropdown from "../pages/dropdown/dropdown.vue";
import {TablePage} from "../pages/table/table";
import {DemoTdesignMobile} from "../pages/demo-tdesign-mobile/demo-tdesign-mobile";
import {DemoArcoDesign} from "../pages/demo-arco-design/demo-arco-design";
import {VuetifyDemoJsx} from "../pages/vutify-demo/vuetify-demo.jsx";
import {DemoPopover} from "../pages/demo-popover/demo-popover";
import TreeDemo from "../pages/tree/tree-demo.vue";
import {TestSelect} from "../pages/select/test-select";
import {DemoRefs} from "../pages/demmo-refs/demo-refs";
import {HocPage} from "../pages/hoc/hoc";
import {ChartPage} from "../pages/chart/chart";
import {UnocssPage} from "../pages/unocss-page/unocss-page";
import {LogicFlow} from "../pages/logicFlow/logicFlow";
import {FlowPage} from "../pages/flow/flow";
import {DemoTreeSelect} from "../pages/demo-tree-select/demo-tree-select";
import {DemoResizeBox} from "../pages/demo-resize-box/demo-resize-box";

export const routes = [
  {path: '/', component: MainPage, title: "主页"},
  {path: '/formily', component: Formily, title: "formily配置"},
  {path: '/emit', component: TestEmit},
  {path: '/demo-search-tree', component: DemoSearchTree, title: '搜索树'},
  //{path: '/demo', component: Demo},
  {path: '/test', component: Test},
  {path: '/demo-hooks', component: DemoHooks,title:"hook测试"},
  {path: '/demo-text', component: DemoText, title: '文本测试'},
  {path: '/demo-virtual', component: DemoVirtual, title: '虚拟滚动'},
  {path: '/demo-resize-box', component: DemoResizeBox, title: '伸缩框 ResizeBox'},
  /*{
    // path: '/demo-wap',
    // redirect: '/demo-wap/demo-text',
    title: '演示',
    children: [
      {path: '/demo-text', component: DemoText, title: '文本测试'},
      {path: '/demo-virtual', component: DemoVirtual, title: '虚拟滚动'},
    ]
  },*/
  // {path: '/monaco-editor', component: MonacoEditor, title: '代码编辑器'},
  {path: '/demo-directives', component: DemoDirectives, title: '指令测试'},
  {path: '/scroll', component: ScrollBar, title: '滚动条'},
  {path: '/tabs', component: Tabs, title: "tabs组件"},
  {path: '/frame', component: DesignerView, title: "frame测试"},
  {path: '/hoc-render', component: HocRender, title: "组件hoc"},
  {path: '/vm-update', component: VmUpdate, title: "组件更新"},
  {path: '/space', component: SpaceContainer, title: "space仿写"},
  {path: '/graph-demo', component: GraphDemo, title: "graph图结构"},
  {path: '/generator-code', component: GeneratorCode, title: "代码生成"},
  {path: '/demo-proxy', component: DemoProxy, title: "代理"},
  {path: '/demo-tree-select', component: DemoTreeSelect, title: "下拉选择树"},
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
  {path: '/demo-tdesign-mobile', component: DemoTdesignMobile, title: "DemoTdesignMobile"},
]
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes,
})

export default {}
