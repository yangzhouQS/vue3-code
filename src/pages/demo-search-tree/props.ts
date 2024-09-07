import { SearchTreeProps } from './type'
import { PropType } from 'vue'

export default {
  /** 树数据，泛型 `T` 表示树节点 TS 类型 */
  data: {
    type: Array as PropType<SearchTreeProps['data']>,
    default: (): SearchTreeProps['data'] => []
  },
  /** 是否禁用树操作 */
  disabled: Boolean,
  /** 是否展开全部节点 */
  expandAll: Boolean,
  /** 默认展开的级别，第一层为 0 */
  expandLevel: {
    type: Number,
    default: 0
  },
  /** 展开的节点值 */
  expanded: {
    type: Array as PropType<SearchTreeProps['expanded']>,
    default: undefined as SearchTreeProps['expanded']
  },
  /** 展开的节点值，非受控属性 */
  defaultExpanded: {
    type: Array as PropType<SearchTreeProps['defaultExpanded']>,
    default: (): SearchTreeProps['defaultExpanded'] => []
  },
  /** 用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: 'key', label 'name', children: 'list' }`。其中，disabled 待开发。 */
  keys: {
    type: Object as PropType<SearchTreeProps['keys']>
  },
  /** 延迟加载 children 为 true 的节点的子节点数据，即使 expandAll 被设置为 true，也同样延迟加载 */
  lazy: {
    type: Boolean,
    default: true
  },
  /** 连接线。值为 false 不显示连接线；值为 true 显示默认连接线；值类型为 Function 表示自定义连接线 */
  line: {
    type: [Boolean, Function] as PropType<SearchTreeProps['line']>,
    default: false as SearchTreeProps['line']
  },
  /** 加载子数据的方法，在展开节点时调用（仅当节点 children 为 true 时生效），泛型 `T` 表示树节点 TS 类型 */
  load: {
    type: Function as PropType<SearchTreeProps['load']>
  },
  /** 节点点击时触发，泛型 `T` 表示树节点 TS 类型 */
  onClick: Function as PropType<SearchTreeProps['onClick']>,
  /** 节点展开或收起时触发，泛型 `T` 表示树节点 TS 类型 */
  onExpand: Function as PropType<SearchTreeProps['onExpand']>,
  /** 异步加载后触发，泛型 `T` 表示树节点 TS 类型 */
  onLoad: Function as PropType<SearchTreeProps['onLoad']>,
}
