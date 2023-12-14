import BaseNodeModel from "@/pages/logicFlow/node/BaseNodeModel";
import BaseEdgeModel from "@/pages/logicFlow/edge/BaseEdgeModel";
import {IBaseModel} from "@/pages/logicFlow/BaseModel";
import {Definition} from "@/pages/logicFlow/type/options";
import {GraphConfigData} from "@/pages/logicFlow/type";


export class GraphModel {
  /**
   * 维护所有节点和边类型对应的model
   */
  modelMap = new Map<string, IBaseModel>();

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

  constructor(options: Definition) {
  }

  get nodesMap(): { [key: string]: { index: number, model: BaseNodeModel } } {
    return this.nodes.reduce((nMap, model, index) => {
      nMap[model.id] = {index, model};
      return nMap;
    }, {});
  }

  get edgesMap(): { [key: string]: { index: number, model: BaseEdgeModel } } {
    return this.edges.reduce((eMap, model, index) => {
      eMap[model.id] = {index, model};
      return eMap;
    }, {});
  }

  get modelsMap(): { [key: string]: BaseNodeModel | BaseEdgeModel } {
    return [...this.nodes, ...this.edges].reduce((eMap, model) => {
      eMap[model.id] = model;
      return eMap;
    }, {});
  }

  /**
   * 获取画布数据
   */
  modelToGraphData(): GraphConfigData {
    const edges = [];
    this.edges.forEach(edge => {
      const data = edge.getData();
      if (data && !edge.virtual) edges.push(data);
    });
    const nodes = [];
    this.nodes.forEach(node => {
      const data = node.getData();
      if (data && !node.virtual) nodes.push(data);
    });
    return {
      nodes,
      edges,
    };
  }


  /**
   * 获取边的model
   */
  getEdgeModelById(edgeId: string): BaseEdgeModel | undefined {
    return this.edgesMap[edgeId]?.model;
  }

  /**
   * 获取节点或者边的model
   */
  getElement(id: string): BaseNodeModel | BaseEdgeModel | undefined {
    return this.modelsMap[id];
  }

  /**
   * 所有节点上所有边的model
   */
  getNodeEdges(nodeId): BaseEdgeModel[] {
    const edges = [];
    for (let i = 0; i < this.edges.length; i++) {
      const edgeModel = this.edges[i];
      const nodeAsSource = this.edges[i].sourceNodeId === nodeId;
      const nodeAsTarget = this.edges[i].targetNodeId === nodeId;
      if (nodeAsSource || nodeAsTarget) {
        edges.push(edgeModel);
      }
    }
    return edges;
  }

  /**
   * 修改节点的id， 如果不传新的id，会内部自动创建一个。
   * @param { string } oldId 将要被修改的id
   * @param { string } newId 可选，修改后的id
   * @returns 修改后的节点id, 如果传入的oldId不存在，返回空字符串
   */
  changeNodeId<T extends string>(oldId, newId?: T | string): T | string {

    return '';
  }

  /**
   * 修改边的id， 如果不传新的id，会内部自动创建一个。
   * @param { string } oldId 将要被修改的id
   * @param { string } newId 可选，修改后的id
   * @returns 修改后的节点id, 如果传入的oldId不存在，返回空字符串
   */
  changeEdgeId<T extends string>(oldId: string, newId?: string): T | string {
    return '';
  }

  // ============== 节点增删改查 ==================
  // ============== 边的增删改查 ==================


  /**
   * 获取所有以此节点为终点的边
   */
  getNodeIncomingEdge(nodeId) {
    const edges = [];
    this.edges.forEach(edge => {
      if (edge.targetNodeId === nodeId) {
        edges.push(edge);
      }
    });
    return edges;
  }

  /**
   * 获取所有以此节点为起点的边
   */
  getNodeOutgoingEdge(nodeId) {
    const edges = [];
    this.edges.forEach(edge => {
      if (edge.sourceNodeId === nodeId) {
        edges.push(edge);
      }
    });
    return edges;
  }

  /**
   * 获取节点连接到的所有起始节点
   */
  getNodeIncomingNode(nodeId) {
    const nodes = [];
    this.edges.forEach(edge => {
      if (edge.targetNodeId === nodeId) {
        nodes.push(this.nodesMap[edge.sourceNodeId].model);
      }
    });
    return nodes;
  }

  /**
   * 获取节点连接到的所有目标节点
   */
  getNodeOutgoingNode(nodeId) {
    const nodes = [];
    this.edges.forEach(edge => {
      if (edge.sourceNodeId === nodeId) {
        nodes.push(this.nodesMap[edge.targetNodeId].model);
      }
    });
    return nodes;
  }

}
