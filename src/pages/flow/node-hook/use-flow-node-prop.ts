import {watch, reactive} from 'vue';
import {NodeUtils} from "../utils/flow-util";

/**
 * 节点操作 hooks
 * 分离出来方便测试
 * @param activeConfig
 * @param processData
 */
export const useFlowNodePropStates = (activeConfig = {}, processData = {}) => {
  const state = reactive({
    isConditionNode: false,
    isApproveNode: false,
    isCopyNode: false,
    isStartNode: false,

    priorityLength: 0
  })


  // 判断是否是条件节点
  const _isConditionNode = () => {
    return activeConfig ? NodeUtils.isConditionNode(activeConfig) : false
  }

  /** 判断是否是审批节点 **/
  const _isApproveNode = () => {
    return activeConfig ? NodeUtils.isApproverNode(activeConfig) : false;
  }

  /** 是否为起始节点 **/
  const _isStartNode = () => {
    return activeConfig ? NodeUtils.isStartNode(activeConfig) : false
  }

  /*抄送人节点*/
  const _isCopyNode = () => {
    return activeConfig ? NodeUtils.isCopyNode(activeConfig) : false
  }


  /**
   * 获取前一个节点数组长度
   */
  const getPrevData = () => {
    return NodeUtils.getPreviousNode(activeConfig.prevId, processData)
  }

  /**
   * 用于获取节点优先级范围
   */
  const getPriorityLength = () => {
    return 3
    return getPrevData().conditionNodes.length
  }


  watch(() => activeConfig, (newValue, oldValue) => {
    state.isConditionNode = _isConditionNode()
    state.isApproveNode = _isApproveNode()
    state.isCopyNode = _isCopyNode()
    state.isStartNode = _isStartNode()


    if (newValue) {
      state.priorityLength = getPriorityLength()
    }

  }, {immediate: true, deep: true})

  return state
}
