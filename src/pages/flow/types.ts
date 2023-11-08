import {a} from "vitest/dist/reporters-5f784f42";

/**
 * 节点关联属性信息
 */
export interface INodePropertiesType {
  title: string;
  initiator: string | null
  formOperates: Array<{ formId: number; formOperate: number }>;

  conditions?: any[];
  isDefault?: boolean
  nodeId?: string;
  prevId?: string;
  childNode?: IPublicFlowConfig

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
  type: string;
  content: string;
  properties: INodePropertiesType;
  nodeId: string;
  prevId: string;
  childNode: IPublicFlowConfig;
  conditionNodes: any[]
}


export interface NodeFactoryParams {
  data: IPublicFlowConfig // 配置数据
  verifyMode: boolean // 是否校验
}
