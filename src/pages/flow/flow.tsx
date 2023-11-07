import {defineComponent, ref, onMounted, reactive} from 'vue';
import {bpmnData} from './bpmn'
import {Graph, Cell} from '@antv/x6'
import {registerNode} from "@/pages/flow/plugin";
import {Plus,Minus} from "@element-plus/icons-vue"
import "./style.less"

export const FlowPage = defineComponent({
  name: 'FlowPage',
  setup(props) {
    registerNode(Graph)
    const state = reactive({
      drawerPage: false,
      step: 5,
      scaleVal: 100
    })
    // data
    const data = ref<any>({});
    // methods
    const methods = {
      changeScale: (step) => {
        //
      },
    };
    onMounted(() => {
    })
    return () => {
      return <div class={'full-container flow-container'}>
        <div class="scale-slider">
          <el-icon class={'scale-btn'}  onClick={methods.changeScale.bind(null, -1)}><Minus /></el-icon>
          <span  class={'text-14 select-none'}>{state.scaleVal}%</span>
          <el-icon class={'scale-btn'}  onClick={methods.changeScale.bind(null, 1)}><Plus /></el-icon>
        </div>
        <div class={'drawer-page'}>
          <el-drawer
            v-model={state.drawerPage}
            title="I am the title"
          >
            <span>Hi, there!</span>
          </el-drawer>
        </div>
        <div id="container">

        </div>
      </div>;
    };
  }
});
