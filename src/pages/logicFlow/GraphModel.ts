


export class GraphModel {
  /**
   * 维护所有节点和边类型对应的model
   */
  modelMap = new Map();

  /**
   * 在图上操作创建边时，默认使用的边类型.
   */
  edgeType: string;
  /**
   * 当前图上所有节点的model
   */
  nodes: BaseNodeModel[] = [];
  /**
   * 当前图上所有边的model
   */
  edges: BaseEdgeModel[] = [];


}
