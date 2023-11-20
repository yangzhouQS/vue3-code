import {NodeUtils} from "@/pages/flow/utils/flow-util";

/**
 * 节点操作 hooks
 * 分离出来方便测试
 * @param activeConfig
 * @param processData
 */
export const useFlowNodePropHooks = (activeConfig = {}, processData = {}) => {
  // 判断是否是条件节点
  const isConditionNode = () => {
    console.log(NodeUtils.isConditionNode(activeConfig), activeConfig.type);
    return activeConfig ? NodeUtils.isConditionNode(activeConfig) : false
  }

  /** 判断是否是审批节点 **/
  const isApproveNode = () => {
    return activeConfig ? NodeUtils.isApproverNode(activeConfig) : false;
  }

  /** 是否为起始节点 **/
  const isStartNode = () => {
    return activeConfig ? NodeUtils.isStartNode(activeConfig) : false
  }

  /*抄送人节点*/
  const isCopyNode = () => {
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
    // return getPrevData().conditionNodes.length
  }

  return {
    /*同级分支深度层级*/
    getPriorityLength,
    getPrevData,
    /*节点连线判断*/
    isApproveNode,
    isConditionNode,
    isStartNode,
    isCopyNode,
  }
}
