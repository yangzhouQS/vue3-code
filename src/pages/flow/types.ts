export enum EnumNodeType {
  start, // 发起人
  approver, // 审批人
  copy, // 抄送人
  condition, // 条件分支
}

/**
 * 节点关联属性信息
 */
export interface INodePropertiesType {
  /**
   * 节点配置标题
   */
  title: string;

  /**
   * 发起人
   */
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
  type: EnumNodeType; // 'start' | 'approver' | 'condition' | 'copy';

  /**
   * 当前节点描述显示的文字
   */
  content: string;

  /**
   * 当前节点的配置属性
   */
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
   * 下一个子节点配置
   */
  childNode: IPublicFlowConfig;


  /**
   * 条件分支配置数据
   */
  conditionNodes?: IPublicFlowConfig[]
}

/**
 * 发起人配置类型
 */
export interface IInitiatorType {
  /**
   * 发起人类型
   */
  type: EnumInitiator;

  /**
   * 存储制定配置数据结构
   */
  configList: Array<{ id: number; description: string }>
}

// 发起人
export enum EnumInitiator {
  all,
  user,
  role,
  post
}

/**
 * 发起人下拉选择数据
 * TODO 考虑放在服务端统一维护
 */
export const configInitiatorType = [
  {value: 'all', label: '所有人'},
  {value: 'user', label: '指定人'},
  {value: 'role', label: '指定角色'},
  {value: 'post', label: '指定岗位'},
]

export interface NodeFactoryParams {
  data: IPublicFlowConfig // 配置数据
  verifyMode: boolean // 是否校验
}
