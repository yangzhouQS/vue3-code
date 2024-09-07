import * as Vue from 'vue'
import { Ref } from 'vue'
export type TypeCreateElement = typeof Vue.h
export type TypeRef<T> = Ref<T>


/**
 * 通用全局类型
 * */
export type PlainObject = { [key: string]: any }

export type OptionData = {
  label?: string
  value?: string | number
} & PlainObject


export type TreeOptionData<T = string | number> = {
  children?: Array<TreeOptionData<T>> | boolean
  /** option label content */
  label?: string | TNode
  /** option search text */
  text?: string
  /** option value */
  value?: T
  /** option node content */
  content?: string | TNode
} & PlainObject


/** Vue3 特有全局类型 */
type VNode = import('vue').VNode
export type ScopedSlot = () => SlotReturnValue
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray
export type SlotReturnArray = Array<SlotReturnValue>

export interface TVNode extends VNode {
  name: string
}

export type TNodeReturnValue = SlotReturnValue

export interface SearchTreeKeysType{
  value: string
  label: string
  disabled: string
  children: string
}

// 严格执行是否有参数，不允许出现 props?:T
export type TNode<T = undefined> = T extends undefined
  ? (h: typeof import('vue').h) => TNodeReturnValue
  : (h: typeof import('vue').h, props: T) => TNodeReturnValue

export interface SearchTreeNodeState {
  /**
   * 节点是否被禁用
   * @default false
   */
  disabled?: boolean;  /**
   * 节点是否已展开
   * @default false
   */
  expanded?: boolean;  /**
   * 节点标签文案
   * @default ''
   */
  label?: string;
  /**
   * 子节点数据是否在加载中
   * @default false
   */
  loading?: boolean;
  /**
   * 节点值
   */
  value?: string | number;
  /**
   * 节点是否可视
   * @default false
   */
  visible?: boolean;
}

/**
 * 节点模型
 */
export interface SearchTreeNodeModel<T extends TreeOptionData = TreeOptionData> extends SearchTreeNodeState{
  /**
   * 节点数据，泛型 `T` 表示树节点 TS 类型，继承 `TreeOptionData`
   */
  data: T;  /**
   * 禁用状态
   */
  disabled: boolean;
  /**
   * 当前节点是否展开
   */
  expanded: boolean;

  /**
   * 当前节点是否处于加载中状态
   */
  loading: boolean;
  /**
   * 追加子节点数据，泛型 `T` 表示树节点 TS 类型，继承 `TreeOptionData`
   */
  appendData: (data: T | Array<T>) => void;
  /**
   * 默认获取当前节点的全部子节点，deep 值为 true 则表示获取全部子孙节点
   */
  getChildren: (deep: boolean) => Array<SearchTreeNodeModel<T>> | boolean;
  /**
   * 获取节点在父节点的子节点列表中的位置，如果没有父节点，则获取节点在根节点列表的位置
   */
  getIndex: () => number;
  /**
   * 获取节点所在的层级
   */
  getLevel: () => number;
}
export type SearchTreeNodeValue = string | number;



export interface SearchTreeProps<T extends TreeOptionData = TreeOptionData> {
  /**
   * 树数据，泛型 `T` 表示树节点 TS 类型
   * @default []
   */
  data?: Array<T>;
  /**
   * 是否禁用树操作
   */
  disabled?: boolean;
  /**
   * 是否展开全部节点
   * @default false
   */
  expandAll?: boolean;
  /**
   * 展开的节点值
   * @default []
   */
  expanded?: Array<SearchTreeNodeValue>;
  /**
   * 展开的节点值，非受控属性
   * @default []
   */
  defaultExpanded?: Array<SearchTreeNodeValue>;
  /**
   * 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label 'name', children: 'list' }`。其中，disabled 待开发。
   */
  keys?: SearchTreeKeysType;
  /**
   * 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载
   * @default true
   */
  lazy?: boolean;

  /**
   * 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线
   * @default false
   */
  line?: boolean | TNode;
  /**
   * 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 TS 类型
   */
  load?: (node: SearchTreeNodeModel<T>) => Promise<Array<T>>;
  /**
   * 节点点击时触发，泛型 `T` 表示树节点 TS 类型
   */
  onClick?: (context: { node: SearchTreeNodeModel<T>; e: MouseEvent }) => void;
  /**
   * 节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型
   */
  onExpand?: (
    value: Array<SearchTreeNodeValue>,
    context: { node: SearchTreeNodeModel<T>; e?: MouseEvent; trigger: 'node-click' | 'icon-click' | 'setItem' },
  ) => void;
  /**
   * 异步加载后触发，泛型 `T` 表示树节点 TS 类型
   */
  onLoad?: (context: { node: SearchTreeNodeModel<T> }) => void;
}
