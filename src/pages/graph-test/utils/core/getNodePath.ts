import {EdgeData, NodeData} from "../../types/models";import {getParentsForNodeId} from "../graph/graphHelpers";

/**
 * 获取节点的路径
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param nodeId 目标节点ID
 * @returns 返回目标节点的路径字符串
 */
export function getNodePath(nodes: NodeData[], edges: EdgeData[], nodeId: string) {
  // 引入并禁用 eslint 对动态导入的警告
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const { getParentsForNodeId } = require("reaflow");

  let resolvedPath = ""; // 初始化路径字符串

  // 获取目标节点的所有父节点ID
  const parentIds = getParentsForNodeId(nodes, edges, nodeId).map(n => n.id);
  // 将父节点ID数组反转并追加目标节点ID，得到完整的路径
  const path = parentIds.reverse().concat(nodeId);

  // 初始化根数组元素ID数组
  const rootArrayElementIds = ["1"];
  // 初始化边映射，用于快速查找某节点的子节点
  const edgesMap = new Map();

  // 构建边映射
  for (const edge of edges) {
    if (!edgesMap.has(edge.from!)) {
      edgesMap.set(edge.from!, []);
    }
    edgesMap.get(edge.from!).push(edge.to);
  }

  // 查找所有根节点ID
  for (let i = 1; i < edges.length; i++) {
    const curNodeId = edges[i].from!;

    // 如果当前节点ID已经在根数组元素ID数组中，则跳过
    if (rootArrayElementIds.includes(curNodeId)) continue;
    // 如果当前节点ID没有在边映射中，则将其添加到根数组元素ID数组中
    if (!edgesMap.has(curNodeId)) {
      rootArrayElementIds.push(curNodeId);
    }
  }

  // 根据根数组元素ID的数量构建路径前缀
  if (rootArrayElementIds.length > 1) {
    resolvedPath += `Root[${rootArrayElementIds.findIndex(id => id === path[0])}]`;
  } else {
    resolvedPath += "{Root}";
  }

  // 根据路径构建完整的路径字符串
  for (let i = 1; i < path.length; i++) {
    const curId = path[i];
    const curNode = nodes[+curId - 1];

    if (!curNode) break;
    if (curNode.data?.type === "array") {
      resolvedPath += `.${curNode.text}`;

      // 如果当前节点不是路径的最后一个节点，则添加索引
      if (i !== path.length - 1) {
        const toNodeId = path[i + 1];
        const idx = edgesMap.get(curId).indexOf(toNodeId);

        resolvedPath += `[${idx}]`;
      }
    }

    if (curNode.data?.type === "object") {
      resolvedPath += `.${curNode.text}`;
    }
  }

  return resolvedPath;
}

