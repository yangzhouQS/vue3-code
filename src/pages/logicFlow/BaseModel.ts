import {TextConfig} from "./type";

export interface IBaseModel {
  /**
   * 节点或者边的id.
   *
   * 默认情况下，使用uuidv4生成。
   * 如果想要自定义，可以重写createId生成。
   */
  id:string;

  /**
   * model对应的图形外观类型（eg: 圆形、矩形、多边形等）
   *
   * 不可自定义
   * 用于logicflow内部计算使用。
   */
  modelType: string;
  /**
   * 请勿直接修改属性，如果想要将一个节点类型修改为另一个类型。请使用
   * `lf.graphModel.changeEdgeType`和`lf.graphModel.changeNodeType`
   *
   * 流程图元素类型，自定义元素时对应的标识。
   * 在logicflow/core中对应着rect、circle、polyline这种。
   * 在实际项目中，我们会基于业务类型进行自定义type.
   * 例如BPMN应用场景，我们会定义开始节点的类型为bpmn:start-event
   *
   * 和modelType的区别是，type更多的是业务上的类型，而modelType则是外观上的类型。
   * 例如bpmnjs的开始节点和结束节点type分别为'bpmn:start-event'和'bpmn:end-event'。
   * 但是他们的modelType都是circle-node, 因为他们外观都是基于圆形自定义而来。
   */
  type: string;

  /**
   * 元素上的文本
   *
   * logicflow中存在两种文本
   * 一种是脱离边和节点单独存在的文本
   * 一种是必须和边、节点关联的文本。
   * 此属性控制的是第二种。
   * 节点和边删除、调整的时候，其关联的文本也会对应删除、调整。
   */
  text: TextConfig;
}
