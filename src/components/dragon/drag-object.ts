import {VNode} from 'vue'

export interface IPublicModelDragObject {

    get type(): any;

    get nodes(): any;

    get data(): any;
}

export interface IPublicTypeDragAnyObject {
    type: string;

    [key: string]: any;
}

export type IPublicTypeDragObject = IPublicTypeDragAnyObject;

export interface IPublicModelNode {

    /**
     * 节点 id
     * node id
     */
    id: string;

    /**
     * 节点标题
     * title of node
     */
    get title(): string | VNode;

    /**
     * @deprecated please use isContainerNode
     */
    get isContainer(): boolean;

    /**
     * 是否为「容器型」节点
     * check if node is a container type node
     * @since v1.1.0
     */
    get isContainerNode(): boolean;

    /**
     * @deprecated please use isRootNode
     */
    get isRoot(): boolean;
}
