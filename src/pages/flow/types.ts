import {a} from "vitest/dist/reporters-5f784f42";

/**
 * 节点关联属性信息
 */
export interface INodePropertiesType {
  /**
   * 节点配置标题
   */
  title: string;
  initiator: string | null

  /**
   * 表单操控权限配置
   */
  formOperates: Array<{ formId: number; formOperate: number }>;

  conditions?: any[];
  isDefault?: boolean
  nodeId?: string;
  prevId?: string;
  childNode?: IPublicFlowConfig

  /**
   * 条件节点优先级
   */
  priority?: number
}

export interface INodeConditionItemType {
  type: string;
  content: string;
  properties: INodePropertiesType
}

/**
 * 审批流模型整体数据结构
 */
export interface IPublicFlowConfig {
  /**
   * 节点类型 start |
   */
  type: string;
  content: string;
  properties: INodePropertiesType;

  /**
   * 当前节点唯一id
   */
  nodeId: string;

  /**
   * 前驱节点id
   */
  prevId: string | null;


  /**
   * 子节点配置
   */
  childNode: IPublicFlowConfig;


  /**
   * 条件分支配置数据
   */
  conditionNodes: any[]
}


export interface NodeFactoryParams {
  data: IPublicFlowConfig // 配置数据
  verifyMode: boolean // 是否校验
}
