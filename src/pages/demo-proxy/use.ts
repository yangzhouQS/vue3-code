import type {
  Component,
  ComponentPublicInstance,
  DefineComponent,
  ExtractPropTypes,
  PropType,
} from 'vue';
import { createObjectSpliter } from "@/pages/demo-proxy/utils";
import * as ElementPlus from 'element-plus';



export const leafProps = {
  __comp: {
    type: [Object, Function] as PropType<Component | null>,
    required: true,
  },
  __scope: null,
  __schema: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  __vnodeProps: {
    type: Object as PropType<Record<string, unknown>>,
    default: () => ({}),
  },
  __isRootNode: Boolean,
} as const;

export type LeafProps = ExtractPropTypes<typeof leafProps>;

export const leafPropKeys = Object.keys(leafProps) as (keyof LeafProps)[];

export type LeafComponent = DefineComponent<LeafProps, any, any>;



/*
  // https://github.com/microsoft/TypeScript/issues/33099
  export type VNodeProps = {
    key?: string | number | symbol
    ref?: VNodeRef
    ref_for?: boolean
    ref_key?: string

    // vnode hooks
    onVnodeBeforeMount?: VNodeMountHook | VNodeMountHook[]
    onVnodeMounted?: VNodeMountHook | VNodeMountHook[]
    onVnodeBeforeUpdate?: VNodeUpdateHook | VNodeUpdateHook[]
    onVnodeUpdated?: VNodeUpdateHook | VNodeUpdateHook[]
    onVnodeBeforeUnmount?: VNodeMountHook | VNodeMountHook[]
    onVnodeUnmounted?: VNodeMountHook | VNodeMountHook[]
  }
* */

const splitProps = createObjectSpliter(
  'key,ref,ref_for,ref_key,' +
  'onVnodeBeforeMount,onVnodeMounted,' +
  'onVnodeBeforeUpdate,onVnodeUpdated,' +
  'onVnodeBeforeUnmount,onVnodeUnmounted'
);


export const splitLeafProps = createObjectSpliter(leafPropKeys);


// console.log(ElementPlus);
