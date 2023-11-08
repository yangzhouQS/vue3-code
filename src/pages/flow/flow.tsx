import {defineComponent, ref, onMounted, reactive} from 'vue';
import {Plus, Minus} from "@element-plus/icons-vue"
import "./style.less"
import {FlowCanvas} from "./flow-canvas";
import {FlowNodeProp} from "./flow-node-prop";
import {configData} from "./flow-test-data";
import {createModuleEventBus} from "./utils/event-bus";

export const flowEvent = createModuleEventBus('flow')

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
            deleteNode: (cnf) => {
                console.log('deleteNode', cnf);
            }
        };
        onMounted(() => {
            flowEvent.on('deleteNode', methods.deleteNode)
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
                <FlowNodeProp v-model={state.drawerPage}/>
            </div>;
        };
    }
});
