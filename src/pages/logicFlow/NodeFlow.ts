import {GraphModel} from "./GraphModel";
import {Definition} from "./type/options";
import {EdgeConfig, EdgeData, GraphConfigData, NodeConfig, RegisterConfig} from "./type";
import {formatData} from "./utils/compatible";
import BaseNodeModel from "./node/BaseNodeModel";
import BaseEdgeModel from "./edge/BaseEdgeModel";


class NodeFlow {
  /**
   * 只读：控制整个logicflow画布的model
   */
  graphModel: GraphModel;

  /**
   * 自定义数据格式转换方法
   * 当接入系统格式和logicflow格式不一直的时候，可以自定义此方法来转换数据格式
   * 详情请参考adapter
   * @see todo
   */
  adapterIn: (data: unknown) => GraphConfigData;

  /**
   * 自定义数据格式转换方法
   * 把logicflow输入的格式转换也接入系统需要的格式
   * 详情请参考adapter
   * @see todo
   */
  adapterOut: (data: GraphConfigData, ...rest: any) => unknown;

  /**
   * 支持插件在Nodeflow实例上增加自定义方法
   */
  [propName: string]: any;

  constructor(options: Definition) {
    this.graphModel = new GraphModel(options);

    this.defaultRegister();
  }

  private defaultRegister() {

  }

  register(config: RegisterConfig) {
    this.registerElement(config);
  }

  private registerElement(config: RegisterConfig) {
    this.graphModel.setModel(config.type, config.model);
  }

  /**
   * 批量注册
   * @param elements 注册的元素
   */
  batchRegister(elements: RegisterConfig[]) {
    elements.forEach((element) => {
      this.registerElement(element);
    });
  }

  /**
   * 初始化画布数据
   * @param graphRawData
   */
  renderRawData(graphRawData) {
    this.graphModel.modelToGraphData()
  }

  /**
   * 渲染图
   * @example
   * lf.render({
   *   nodes: [
   *     {
   *       id: 'node_1',
   *       type: 'rect',
   *       x: 100,
   *       y: 100
   *     },
   *     {
   *       id: 'node_2',
   *       type: 'circle',
   *       x: 300,
   *       y: 200
   *     }
   *   ],
   *   edges: [
   *     {
   *       sourceNodeId: 'node_1',
   *       targetNodeId: 'node_2',
   *       type: 'polyline'
   *     }
   *   ]
   * })
   * @param graphData 图数据
   */
  render(graphData = {}) {
    if (this.adapterIn) {
      graphData = this.adapterIn(graphData);
    }
    this.renderRawData(graphData);
  }


  //region 业务属性操作
  /**
   * 设置元素的自定义属性
   * @see todo docs link
   * @param id 元素的id
   * @param properties 自定义属性
   */
  setProperties(id: string, properties: Object): void {
    this.graphModel.getElement(id)?.setProperties(formatData(properties));
  }

  deleteProperty(id: string, key: string): void {
    this.graphModel.getElement(id)?.deleteProperty(key);
  }

  /**
   * 获取元素的自定义属性
   * @param id 元素的id
   * @returns 自定义属性
   */
  getProperties(id: string): Object {
    return this.graphModel.getElement(id)?.getProperties();
  }

  //endregion


  //region 模型 或者 数据操作
  /**
   * 获取节点或边对象
   * @param id id
   */
  getModelById(id: string): BaseNodeModel | BaseEdgeModel {
    return this.graphModel.getElement(id);
  }

  /**
   * 获取节点或边的数据
   * @param id id
   */
  getDataById(id: string): NodeConfig | EdgeConfig {
    return this.graphModel.getElement(id)?.getData();
  }


  //<editor-fold desc="节点数据获取">
  /**
   * 获取节点对象
   * @param nodeId 节点Id
   */
  getNodeModelById(nodeId: string): BaseNodeModel {
    return this.graphModel.getNodeModelById(nodeId);
  }

  /**
   * 获取节点数据
   * @param nodeId 节点
   */
  getNodeDataById(nodeId: string): NodeConfig {
    return this.graphModel.getNodeModelById(nodeId)?.getData();
  }

  //</editor-fold>


  // 边
  //<editor-fold desc="边数据获取">
  /**
   * 基于边Id获取边的model
   * @param edgeId 边的Id
   * @return model
   */
  getEdgeModelById(edgeId: string): BaseEdgeModel {
    const {edgesMap} = this.graphModel;
    return edgesMap[edgeId]?.model;
  }

  /**
   * 基于id获取边数据
   * @param edgeId 边Id
   * @returns EdgeData
   */
  getEdgeDataById(edgeId: string): EdgeData {
    return this.getEdgeModelById(edgeId)?.getData();
  }
  //</editor-fold>

  //endregion
}
