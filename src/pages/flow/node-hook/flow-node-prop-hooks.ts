import {NodeUtils} from "@/pages/flow/utils/flow-util";

/**
 * 节点操作 hooks
 * 分离出来方便测试
 */
export const useFlowNodePropHooks = (activeConfig: any, processData: any) => {
  // 判断是否是条件节点
  const isConditionNode = () => {
    return props.activeConfig ? NodeUtils.isConditionNode(activeConfig) : false
  }

  /** 判断是否是审批节点 **/
  const isApproveNode = () => {
    return this.value ? NodeUtils.isApproverNode(activeConfig) : false;
  }

  /** 是否为起始节点 **/
  const isStartNode = () => {
    return props.activeConfig ? NodeUtils.isStartNode(activeConfig) : false
  }

  /*抄送人节点*/
  const isCopyNode = () => {
    return props.activeConfig ? NodeUtils.isCopyNode(activeConfig) : false
  }

  const getPriorityLength = () => {

  }
  return {
    isApproveNode,
    isConditionNode,
    isStartNode,
    isCopyNode
  }
}
