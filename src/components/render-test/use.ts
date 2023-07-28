import {
  Fragment
} from 'vue'

export function isFragment(val: unknown): val is typeof Fragment {
  return val === Fragment;
}

export type SlotSchemaMap = {
  [x: string]: unknown;
};

export type PropSchemaMap = {
  [x: string]: unknown;
};

export interface NodeSchema {
  nodeId: string
  nodeName: string
}

export interface IPublicTypeNodeSchema extends NodeSchema {
}

export const buildSchema = (schema: NodeSchema, node?: Node | null) => {
  console.log(node)
  return {
    slots: {
      a: 2
    }
  }
}

