import {defineComponent, ref, onMounted, reactive, watch} from 'vue';
import {Plus, Minus} from "@element-plus/icons-vue"
import "./style.less"
import {FlowCanvas} from "./flow-canvas";
import {FlowNodeProp} from "./flow-node-prop";
import {configData} from "./flow-test-data";
import {flowEvent} from "./component/common/flow-event";
import {NodeUtils} from "@/pages/flow/utils/flow-util";

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
      /**
       * 属性面板修改节点信息
       * @param properties 属性面板的当前节点信息
       * @param content
       */
      onEditConfirm:(properties, content)=>{
        console.log(state.activeData);

        state.activeData.content = content || '请设置条件'
        let oldProp = state.activeData.properties;
        state.activeData.properties = properties;
        // 节点条件的优先级修改
        if (NodeUtils.isConditionNode(state.activeData)){
          properties.priority !== oldProp.priority && NodeUtils.resortPrioByCNode(state.activeData,oldProp.priority,configData.processData)
          NodeUtils.setDefaultCondition(state.activeData, configData.processData)
        }
        debugger;
        console.log('onConfirm');
        methods.onCloseDrawer()
        methods.forceUpdate()
      },
      forceUpdate:()=>{

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
      // console.log('watch drawerPage',newValue);
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
          onConfirm={methods.onEditConfirm}
          onCancel={methods.onCloseDrawer}
        />
      </div>;
    };
  }
});
