import {SetupContext, VNode, ToRefs} from "vue";
import {SearchTreeStore} from "./hook/search-tree-store";
import {SearchTreeNode} from "./hook/search-tree-node";
import {SearchTreeProps, TypeRef} from "./type";

export type TypeSearchTreeStore = SearchTreeStore
export type TypeSearchTreeNode = SearchTreeNode
type TypeRenderTNodeOption = any

export interface TypeScopedSlots {
  empty?: (opts?: TypeRenderTNodeOption) => VNode
  item?: (opts?: TypeRenderTNodeOption) => VNode
}

export interface TypeSearchTreeScope {
  store: TypeSearchTreeStore
  searchTreeContentRef: TypeRef<HTMLDivElement>
  searchTreeProps?: SearchTreeProps
  scopedSlots?: TypeScopedSlots
}

export interface TypeSearchTreeState {
  props: SearchTreeProps
  context: SetupContext
  scope: TypeSearchTreeScope
  store: TypeSearchTreeStore
  nodes: TypeRef<TypeSearchTreeNode[]>
  allNodes: TypeRef<TypeSearchTreeNode[]>
  searchTreeContentRef: TypeRef<HTMLDivElement>
  mouseEvent?: Event
  setStore: (store: TypeSearchTreeStore) => void
  refProps: ToRefs<SearchTreeProps>
}
