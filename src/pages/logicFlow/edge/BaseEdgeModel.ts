import {assign, isObject} from "lodash";
import {IBaseModel} from "../BaseModel";
import {formatData} from "../utils/compatible";
import {pickEdgeConfig} from "../utils/edge";
import {GraphModel} from "../GraphModel";
import {ElementType} from "../constant/constant";
import {EdgeConfig, EdgeData, TextConfig} from "../type";

export interface IBaseEdgeModel extends IBaseModel {
  sourceNodeId: string;
  targetNodeId: string;
  properties: Record<string, any>;

  /**
   * 获取边线数据
   */
  getData: () => EdgeData;

  /**
   * 获取业务属性
   */
  getProperties: () => Record<string, any>;

  /*  /!**
     * 边的前一个节点
     *!/
    sourceNode:()=>BaseNodeModel;

    /!**
     * 边的后一个节点
     *!/
    targetNode:()=>BaseNodeModel;*/
}

export default class BaseEdgeModel implements IBaseEdgeModel {
  readonly BaseType = ElementType.EDGE;

  /**
   * 虚拟
   */
  virtual = false;

  id: string;
  modelType: string;
  text: TextConfig;
  type: string;

  properties: Record<string, any>;
  sourceNodeId: string;
  targetNodeId: string;
  graphModel: GraphModel;

  constructor(data: EdgeConfig, graphModel: GraphModel) {
    this.graphModel = graphModel;
    this.initEdgeData(data);
    this.setAttributes();
  }

  private initEdgeData(data: EdgeConfig) {
    if (!data.properties) {
      data.properties = {};
    }

    assign(this, pickEdgeConfig(data));

    // 文本位置依赖于边上的所有拐点
    this.formatText(data);
  }

  /**
   * 设置model属性
   * @overridable 支持重写
   * 每次properties发生变化会触发
   */
  setAttributes() {
  }

  private formatText(data: EdgeConfig) {
    if (!data.text || typeof data.text === 'string') {
      this.text = {
        value: data.text as string || '',
      };
      return;
    }

    if (isObject(data.text)) {
      this.text = {
        value: data.text.value || '',
      }
    }
  }

  /**
   * 获取当前边的properties
   */
  getProperties() {
    return this.properties
  }

  /**
   * 设置边的属性，会触发重新渲染
   * @param key 属性名
   * @param val 属性值
   */
  setProperty(key, val): void {
    this.properties[key] = formatData(val);
    this.setAttributes();
  }

  /**
   * 删除边的属性，会触发重新渲染
   * @param key 属性名
   */
  deleteProperty(key: string): void {
    delete this.properties[key];
    this.setAttributes();
  }

  /**
   * 设置边的属性，会触发重新渲染
   * @param key 属性名
   * @param val 属性值
   */
  setProperties(properties): void {
    this.properties = formatData(properties);
    this.setAttributes();
  }


  /**
   * 获取被保存时返回的数据
   *
   * @overridable 支持重写
   */
  getData(): EdgeData {
    const {value} = this.text;
    const data: EdgeData = {
      id: this.id,
      type: this.type,
      sourceNodeId: this.sourceNode.id,
      targetNodeId: this.targetNode.id,
      properties: this.properties
    };
    if (value) {
      data.text = {
        value,
      };
    }

    return data;
  }

  /**
   * 边的前一个节点
   */
  get sourceNode() {
    return this.graphModel?.nodesMap[this.sourceNodeId]?.model;
  }

  /**
   * 边的后一个节点
   */
  get targetNode() {
    return this.graphModel?.nodesMap[this.targetNodeId]?.model;
  }
}
