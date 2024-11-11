import { NodeType } from "jsonc-parser";
import { calculateNodeSize } from "../graph/calculateNodeSize";
import { Graph } from "../json/jsonParser";

type Props = {
  graph: Graph;
  text: string | [string, string][];
  isEmpty?: boolean;
  type?: NodeType;
};

/**
 * 向图中添加节点
 *
 * @param graph 图对象，包含节点和边的数组
 * @param text 节点的文本内容，可以是字符串或字符串数组
 * @param type 节点的类型，默认为 "null"，可选值为 "null"、"array"、"object"
 * @param isEmpty 是否为空节点，默认为 false
 * @returns 返回新添加的节点的ID
 */
export const addNodeToGraph = ({ graph, text, type = "null", isEmpty = false }: Props) => {
  const id = String(graph.nodes.length + 1);
  const isParent = type === "array" || type === "object";
  // const { width, height } = calculateNodeSize(text, isParent);

  const node = {
    id,
    text,
    // width,
    // height,
    data: {
      type,
      isParent,
      isEmpty,
      childrenCount: isParent ? 1 : 0,
    },
  };

  graph.nodes.push(node);

  return id;
};
