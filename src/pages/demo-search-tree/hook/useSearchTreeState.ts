import {ref, SetupContext, toRefs} from "vue";
import {SearchTreeNode} from "./search-tree-node";
import {TypeSearchTreeState, TypeSearchTreeStore} from "../search-tree-type";
import {SearchTreeProps, TypeRef} from "../type";


export function useSearchTreeState(props: SearchTreeProps, context: SetupContext) {
  const searchTreeContentRef = ref<HTMLDivElement>()
  const nodes: TypeRef<SearchTreeNode[]> = ref([])
  const allNodes: TypeRef<SearchTreeNode[]> = ref([])

  const refProps = toRefs(props)

  function setStore(store: TypeSearchTreeStore) {
    state.store = store
    state.scope.store = store
    allNodes.value = store.getNodes()
  }

  const state: TypeSearchTreeState = {
    props,
    context,
    scope: {
      store: null,
      searchTreeContentRef,
      searchTreeProps: props,
      scopedSlots: {},
    },
    store: null,

    // 渲染节点
    nodes,
    // 所有节点
    allNodes,
    searchTreeContentRef,
    // 缓存点击事件
    mouseEvent: null,
    setStore,
    refProps,
  }
  return {
    state
  }
}
