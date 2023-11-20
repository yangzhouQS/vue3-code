import {defineComponent, ref, onMounted, reactive, watch} from 'vue';
import {Plus, Minus} from "@element-plus/icons-vue"
import "./style.less"
import {FlowCanvas} from "./flow-canvas";
import {FlowNodeProp} from "./flow-node-prop";
import {configData} from "./flow-test-data";
import {flowEvent} from "./component/common/flow-event";

// https://github.com/SNFocus/approvalFlow
export const FlowPage = defineComponent({
  name: 'FlowPage',
  setup(props) {
    const state = reactive({
      drawerPage: false,
      step: 5,
      scaleVal: 100,

      activeData: {} // 当前操作数据
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
      deleteNode: (cnf) => {
        console.log('deleteNode', cnf);
      },
      onCloseDrawer:()=>{
        state.drawerPage = false;
      },
      onConfirm:()=>{
        console.log('onConfirm');
      }
    };
    onMounted(() => {
      flowEvent.on('deleteNode', methods.deleteNode)
      flowEvent.on('edit', (conf) => {
        state.activeData = conf;
        state.drawerPage = true;
      })
    })
    watch(() => state.drawerPage, (newValue, oldValue) => {
      console.log('watch drawerPage',newValue);
    })
    return () => {
      return <div class={'full-container flow-container'}>
        <div class="flow-scale-slider">
          <el-icon class={'flow-scale-btn'} onClick={methods.changeScale.bind(null, -1)}><Minus/></el-icon>
          <span class={'text-14 select-none'}>{state.scaleVal}%</span>
          <el-icon class={'flow-scale-btn'} onClick={methods.changeScale.bind(null, 1)}><Plus/></el-icon>
        </div>
        <FlowCanvas
          style={{transform: `scale(${state.scaleVal / 100})`}}
          data={configData.processData}
        />
        <FlowNodeProp
          v-model:drawerPage={state.drawerPage}
          activeConfig={state.activeData}
          processData={configData.processData}
          onConfirm={methods.onConfirm}
          onCancel={methods.onCloseDrawer}
        />
      </div>;
    };
  }
});
