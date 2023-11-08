import {defineComponent, ref, reactive} from 'vue';
import {IPublicFlowConfig, NodeFactoryParams} from "./types";
import {hasBranch, isCondition, NodeUtils} from "./utils/flow-util";
import {isFunction} from "lodash";
import {Plus, ArrowRight, Close} from '@element-plus/icons-vue'
import {IconChaoSong, IconCondition, IconShenPi} from "./component/icon";
import {flowEvent} from "@/pages/flow/flow";


/**
 * 流程结束
 */
function addEndNode() {
    return <section class="flow-end-node flex-center">流程结束</section>;
}

/**
 * 添加节点和条件按钮
 * @date 2023-11-8 15:13:58
 * @param data
 * @param isBranch
 */
function addNodeButton(data: IPublicFlowConfig, isBranch = false) {
    // 只有非条件节点和条件分支树下面的那个按钮 才能添加新分支树
    let couldAddBranch = !hasBranch(data.conditionNodes) || isBranch;
    let isEmpty = data.type === "empty";
    if (isEmpty && !isBranch) {
        return "";
    }
    return <div class={'flow-node-add-btn flex-center'}>
        <el-popover placement={'right'} trigger={'click'} width={300}>
            {{
                reference: () => {
                    return <div class={'flow-plus-icon flex-center cursor-pointer'}>
                        <el-icon><Plus/></el-icon>
                    </div>
                },
                default: () => {
                    return <div class={'flow-node-add-container d-flex'}>
                        <div class={'flow-node-step mr-4'}>
                            <div class={'flow-node-icon flow-orange-color'}>
                                <IconShenPi/>
                            </div>
                            <span>审批人</span>
                        </div>
                        <div class={'flow-node-step mr-4'}>
                            <div class={'flow-node-icon flow-primary-color'}>
                                <IconChaoSong/>
                            </div>
                            <span>抄送人</span>
                        </div>
                        <div class={'flow-node-step mr-4'}>
                            <div class={'flow-node-icon flow-success-color'}>
                                <IconCondition/>
                            </div>
                            <span>条件分支</span>
                        </div>
                    </div>
                }
            }}
        </el-popover>
    </div>
}


/**
 * 渲染节点
 */
function createNormalCard(conf: IPublicFlowConfig) {
    const classList = ['flow-path-container', 'd-flex flex-column']
    const afterTrue = (isTrue, name) => (isTrue && classList.push(name), isTrue)
    const isStartNode = afterTrue(NodeUtils.isStartNode(conf), 'start-node')
    const isApprNode = afterTrue(NodeUtils.isApproverNode(conf), 'approver')
    const isCopyNode = afterTrue(NodeUtils.isCopyNode(conf), 'copy')
    return <div
        class={classList}
        onClick={() => {
            flowEvent.emit('edit', conf)
        }}
    >
        <div class="flow-path-header px-2">
            <div
                class={'flow-path-title-box relative'}
                onClick={() => {

                }}
            >
                {
                    isApprNode && (<IconShenPi/>)
                }
                {
                    isCopyNode && (<IconChaoSong/>)
                }
                <div class="flow-path-title-text">
                    {conf.properties.title}
                </div>
                <input
                    class={'flow-path-title-input'}
                    v-model={conf.properties.title}
                    onClick={ev => ev.stopPropagation()}
                />
                <div
                    class={'flow-path-action absolute cursor-pointer'}
                    onClick={() => {
                        flowEvent.emit('deleteNode', conf, '')
                    }}
                >
                    <el-icon><Close/></el-icon>
                </div>
            </div>
        </div>
        <div class="flex-1 flow-path-body w-full d-flex justify-space-between pa-1 align-center">
            <span>{conf.content}</span>
            <span>
                <el-icon><ArrowRight/></el-icon>
            </span>
        </div>
    </div>

}

const createFunc = (...arg) => createNormalCard.call(arg[0], ...arg)
const nodeTypeRender = {
    start: createFunc, // 起始节点
    approver: createFunc, // 审批节点
    copy: createFunc, // 抄送节点
    empty: _ => '', // 空节点
    condition: function (conf) {

    }
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

    /*普通节点渲染*/
    let selfNode = (<div class={'flow-node-wrap'}>
        <div class={'flow-node-wrap-box flex-center'}>
            <el-tooltip content="未设置条件" placement="top" effect="dark">
                <div class="flow-error-tip" onClick={eventLancher.bind(null, "edit", data)}>!!!</div>
            </el-tooltip>
            {nodeTypeRender[data.type](data)}
            {addNodeButton(data)}
        </div>
    </div>)

    /*分支结构渲染*/
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

    /*判断条件渲染*/
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
    resultRender.push(function () {
        return (<div>hello</div>)
    })
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
                {NodeFactory({data: props.data, verifyMode: props.verifyMode}).filter(Boolean).map(fn => {
                    if (isFunction(fn)) {
                        return fn()
                    } else {
                        return fn
                    }
                })}
                {addEndNode()}
            </div>)
        };
    }
});
