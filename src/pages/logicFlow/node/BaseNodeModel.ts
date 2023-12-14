import {IBaseModel} from "@/pages/logicFlow/BaseModel";
import {ElementType} from "@/pages/logicFlow/constant/constant";
import {NodeConfig, NodeData, TextConfig} from "@/pages/logicFlow/type";
import {GraphModel} from "@/pages/logicFlow/GraphModel";
import {assign} from 'lodash'
import {pickNodeConfig} from "@/pages/logicFlow/utils/node";

interface IBaseNodeModel extends IBaseModel {
  /**
   * model基础类型，固定为node
   */
  readonly BaseType: ElementType.NODE,
}

export default class BaseNodeModel implements IBaseNodeModel {
  readonly BaseType: ElementType.NODE;
  id: string;
  modelType: string;
  text: TextConfig;
  type: string;
  properties: Record<string, any> = {};

  // 其它属性
  graphModel: GraphModel;

  /**
   * 虚拟
   */
  virtual = false;

  constructor(data: NodeConfig, graphModel: GraphModel) {
    this.graphModel = graphModel;
    this.initNodeData(data);
    this.setAttributes();

  }

  /**
   * @overridable 可以重写
   * 初始化节点数据
   * initNodeData和setAttributes的区别在于
   * initNodeData只在节点初始化的时候调用，用于初始化节点的所有属性。
   * setAttributes除了初始化调用外，还会在properties发生变化了调用。
   */
  public initNodeData(data) {
    if (!data.properties) {
      data.properties = {};
    }
    // this.id = data.id;


    this.formatText(data);
    assign(this, pickNodeConfig(data));
  }

  /**
   * 设置model属性，每次properties发生变化会触发
   * 例如设置节点的宽度
   * @example
   *
   * setAttributes () {
   *   this.width = 300
   *   this.height = 200
   * }
   *
   * @overridable 支持重写
   */
  public setAttributes() {
  }

  /**
   * 初始化文本属性
   */
  formatText(data) {
    if (!data.text) {
      data.text = {
        value: '',
        x: data.x,
        y: data.y,
      };
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y,
      };
    }
  }

  /**
   * 获取被保存时返回的数据
   * @overridable 支持重写
   */
  getData(): NodeData {
    const { x, y, value } = this.text;
    let { properties } = this;
    const data: NodeData = {
      id: this.id,
      type: this.type,
      properties,
    };

    if (value) {
      data.text = {
        x,
        y,
        value,
      };
    }
    return data
  }

  /**
   * 获取当前节点的properties
   */
  getProperties() {
    return this.properties;
  }
}
