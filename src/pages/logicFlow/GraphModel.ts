import BaseNodeModel from "@/pages/logicFlow/node/BaseNodeModel";
import BaseEdgeModel from "@/pages/logicFlow/edge/BaseEdgeModel";
import {IBaseModel} from "@/pages/logicFlow/BaseModel";
import {Definition} from "@/pages/logicFlow/type/options";
import {GraphConfigData} from "@/pages/logicFlow/type";
import EventEmitter from 'eventemitter2';
import {map} from "lodash";
type BaseNodeModelId = string; // 节点ID

export class GraphModel {
  /**
   * 事件中心
   * @see todo docs link
   */
  eventCenter: EventEmitter;

  /**
   * 维护所有节点和边类型对应的model
   */
  modelMap = new Map<string, any>();

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

    this.eventCenter = new EventEmitter();
    this.edgeType = options.edgeType || 'polyline';
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
   * 设置指定类型的Model,请勿直接使用
   */
  setModel(type: string, ModelClass) {
    return this.modelMap.set(type, ModelClass);
  }

  /**
   * 使用新的数据重新设置整个画布的元素
   * 注意：将会清除画布上所有已有的节点和边
   * @param { object } graphData 图数据
   */
  graphDataToModel(graphData: GraphConfigData) {
    if (!graphData) {
      this.nodes = [];
      this.edges = [];
      return;
    }
    if (graphData.nodes) {
      this.nodes = map(graphData.nodes, node => {
        const Model = this.getModel(node.type);
        if (!Model) {
          throw new Error(`找不到${node.type}对应的节点。`);
        }
        return new Model(node, this);
      });
    } else {
      this.nodes = [];
    }
    if (graphData.edges) {
      this.edges = map(graphData.edges, edge => {
        const Model = this.getModel(edge.type);
        if (!Model) {
          throw new Error(`找不到${edge.type}对应的边。`);
        }
        return new Model(edge, this);
      });
    } else {
      this.edges = [];
    }
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
   * 获取指定类型元素对应的Model
   */
  getModel(type: string) {
    return this.modelMap.get(type);
  }

  /**
   * 基于Id获取节点的model
   */
  getNodeModelById(nodeId: BaseNodeModelId): BaseNodeModel {
    return this.nodesMap[nodeId]?.model;
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
