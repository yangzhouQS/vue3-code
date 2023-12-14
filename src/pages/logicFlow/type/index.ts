export type Point = {
  id?: string;
  [key: string]: unknown;
};

/**
 * 文本描述配置数据
 */
export type TextConfig = {
  id?: string;
  value: string;
};


/**
 * 整个画布数据
 */
export type GraphConfigData = {
  nodes: NodeConfig[];
  edges: EdgeConfig[];
};

// 节点数据属性
export type NodeConfig = {
  id?: string;
  type: string;
  text?: TextConfig | string;
  properties?: Record<string, unknown>;
  [key: string]: any;
};

// 节点数据
export type NodeData = {
  id: string;
  type: string;
  text?: TextConfig;
  properties: Record<string, unknown>;
  [key: string]: any;
};

/**
 * 边配置数据
 */
export type EdgeConfig = {
  id?: string;
  /**
   * 边的类型，不传默认为lf.setDefaultEdgeType(type)传入的类型。
   * LogicFlow内部默认为polyline
   */
  type?: string;
  sourceNodeId: string;
  sourceAnchorId?: string;
  targetNodeId: string;
  targetAnchorId?: string;
  text?:
    | {
    x: number;
    y: number;
    value: string;
  }
    | string;
  properties?: Record<string, unknown>;
};

// 边数据
export type EdgeData = {
  id: string;
  type: string;
  sourceNodeId: string;
  targetNodeId: string;
  text?: TextConfig;
  properties: Record<string, unknown>;
  [key: string]: unknown;
};

// 边属性
export type EdgeAttribute = {
  id: string;
  type?: string;
  sourceNodeId?: string;
  targetNodeId?: string;
  text?: TextConfig;
  properties?: Record<string, unknown>;
};

/**
 * 画布节点注册
 */
export type RegisterConfig = {
  type: string;
  view: any;
  model: any;
};
