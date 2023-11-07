import {defineComponent, ref, onMounted, reactive} from 'vue';
import {Plus,Minus} from "@element-plus/icons-vue"
import "./style.less"
import {FlowCanvas} from "@/pages/flow/flow-canvas";
import {FlowNodeProp} from "@/pages/flow/flow-node-prop";
import {configData} from "@/pages/flow/flow-test-data";


// https://github.com/SNFocus/approvalFlow
export const FlowPage = defineComponent({
  name: 'FlowPage',
  setup(props) {
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
        let v = state.scaleVal + step * state.step;
        if (v > 10 && v <= 200) {
          // 缩放介于0%~200%
          state.scaleVal = v;
        }
      },
    };
    onMounted(() => {
    })
    return () => {
      return <div class={'full-container flow-container'}>
        <div class="scale-slider">
          <el-icon class={'flow-scale-btn'}  onClick={methods.changeScale.bind(null, -1)}><Minus /></el-icon>
          <span  class={'text-14 select-none'}>{state.scaleVal}%</span>
          <el-icon class={'flow-scale-btn'}  onClick={methods.changeScale.bind(null, 1)}><Plus /></el-icon>
        </div>
        <FlowCanvas
          style={{ transform: `scale(${state.scaleVal / 100})` }}
          data={configData.processData}
        />
        <FlowNodeProp v-model={state.drawerPage}/>
      </div>;
    };
  }
});
