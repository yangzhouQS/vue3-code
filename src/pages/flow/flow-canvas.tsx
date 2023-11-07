import {defineComponent, ref, reactive} from 'vue';
import {IPublicFlowConfig} from "@/pages/flow/types";
import {hasBranch, isCondition} from "@/pages/flow/flow-util";


/**
 * 流程结束
 */
function addEndNode() {
  return <section class="flow-end-node flex-center">流程结束</section>;
}

interface NodeFactoryParams {
  data: IPublicFlowConfig
  verifyMode: boolean
}

/**
 * 节点分叉渲染
 * @param data
 * @param verifyMode
 * @constructor
 */
function NodeFactory({data, verifyMode}: NodeFactoryParams) {
  if (!data) {
    return;
  }
  const eventLancher = (type, rowData) => {
    console.log(type, rowData);
  }
  let resultRender = []
  let branchNode = null
  let selfNode = (<div class={'node-wrap'}>
    <div class={'node-wrap-box'}>
      <el-tooltip content="未设置条件" placement="top" effect="dark">
        <div class="error-tip" onClick={eventLancher.bind(null, "edit", data)}>!!!</div>
      </el-tooltip>
    </div>
  </div>)

  if (hasBranch(data.conditionNodes)) {
    branchNode = (
      <div class="branch-wrap">
        <div class="branch-box-wrap">
          <div class="branch-box  flex justify-center relative">
            <button
              class="btn"
              onClick={eventLancher.bind(null, "appendConditionNode", data)}
            >
              添加条件
            </button>
            {data.conditionNodes.map(d => NodeFactory.bind(null, d, verifyMode))}
          </div>
        </div>
      </div>
    )
  }

  if (isCondition(data)) {
    <div class="col-box">
      <div class="center-line"></div>
      <div class="top-cover-line"></div>
      <div class="bottom-cover-line"></div>
      {selfNode}
      {branchNode}
      {NodeFactory(data.childNode, verifyMode)}
    </div>
  }

  resultRender.push(selfNode)
  branchNode && resultRender.push(branchNode);
  if (data.childNode) {
    resultRender.push(NodeFactory.bind(null, data.childNode, verifyMode))
  }
  return resultRender
}


export const FlowCanvas = defineComponent({
  name: 'FlowCanvas',
  props: {
    data: {
      type: Object,
      required: true
    },
    // 点击发布时需要校验节点数据完整性 此时打开校验模式
    verifyMode: {
      type: Boolean,
      default: true
    },
  },
  setup(props) {
    // data
    const data = ref<any>({});
    // methods
    const methods = {
      loadData: () => {
        //
      },
    };
    return () => {
      return (<div class={'full-container d-inline-flex align-center flex-column overflow-y-hidden'}>
        {NodeFactory({data: props.data, verifyMode: props.verifyMode})}
        {addEndNode()}
      </div>)
    };
  }
});
