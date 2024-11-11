import {EdgeData, NodeData} from "../../types/models";

/**
 * 辅助函数，用于判断边是否已经存在链接。
 *
 * @param edges 边数组
 * @param from 起始节点
 * @param to 目标节点
 * @returns 如果边已经存在链接，则返回 true；否则返回 false
 */
/**
 * Helper function to determine if edge already has a link.
 */
export function hasLink(edges: EdgeData[], from: NodeData, to: NodeData) {
  return edges.some((e) => e.from === from.id && e.to === to.id);
}


/**
 * 获取指向给定节点的源节点。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param nodeId 目标节点ID
 * @returns 返回指向给定节点的源节点数组
 */
function getSourceNodesForTargetId(
  nodes: NodeData[],
  edges: EdgeData[],
  nodeId: string
) {
  const sourceNodeIds = edges.reduce((acc, edge) => {
    if (edge.to === nodeId) {
      acc.push(edge.from);
    }
    return acc;
  }, []);

  const node = nodes.find((n) => n.id === nodeId);

  if (node?.parent) {
    sourceNodeIds.push(node.parent);
  }

  return nodes.filter((n) => sourceNodeIds.includes(n.id));
}


/**
 * 检测从起始节点到目标节点是否存在循环引用。
 *
 * @param nodes 节点数组
 * @param edges 边数组
 * @param fromNode 起始节点
 * @param toNode 目标节点
 * @returns 如果存在循环引用，则返回 true；否则返回 false
 */
/**
 * Detect if there is a circular reference from the from to the source node.
 */
export function detectCircular(
  nodes: NodeData[],
  edges: EdgeData[],
  fromNode: NodeData,
  toNode: NodeData
) {
  let found = false;

  const traverse = (nodeId: string) => {
    const sourceNodes = getSourceNodesForTargetId(nodes, edges, nodeId);
    for (const node of sourceNodes) {
      if (node.id !== toNode.id) {
        traverse(node.id);
      } else {
        found = true;
        break;
      }
    }
  };

  traverse(fromNode.id);

  return found;
}


/**
 * Given a node id, get all the parent nodes recursively.
 * 获取给定节点ID的所有父节点。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param startId 起始节点ID
 * @returns 返回包含给定节点ID的所有父节点的数组
 */
export const getParentsForNodeId = (
  nodes: NodeData[],
  edges: EdgeData[],
  startId: string
) => {
  const result = [];

  const traverse = (nodeId: string) => {
    const sourceNodes = getSourceNodesForTargetId(nodes, edges, nodeId);
    for (const node of sourceNodes) {
      const has = result.find((n) => n.id === node.id);
      if (!has) {
        result.push(node);
        traverse(node.id);
      }
    }
  };

  traverse(startId);

  return result;
};


/**
 * 根据节点获取相关的边数据。
 *
 * @param edges 边数据数组
 * @param node 节点数据
 * @returns 返回一个对象，包含指向该节点的边数据数组（to）、从该节点出发的边数据数组（from）以及所有与该节点相关的边数据数组（all）
 */
export function getEdgesByNode(edges: EdgeData[], node: NodeData) {
  const to = [];
  const from = [];

  for (const edge of edges) {
    if (edge.to === node.id) {
      to.push(edge);
    }
    if (edge.from === node.id) {
      from.push(edge);
    }
  }

  return {
    to,
    from,
    all: [...to, ...from]
  };
}


/**
 * 根据给定的节点ID，从一组节点中查找该节点，并返回该节点。
 * 如果提供了父节点ID，则会在父节点的子节点中查找目标节点。
 *
 * @param nodeId 要查找的节点ID
 * @param children 节点列表
 * @param parentId 父节点的ID（可选）
 * @returns 找到的节点对象，如果未找到则返回空对象 {}
 */
export function findNestedNode(
  nodeId: string,
  children: any[],
  parentId?: string
): { [key: string]: any } {
  if (!nodeId || !children) {
    return {};
  }

  const foundNode = children.find((n) => n.id === nodeId);
  if (foundNode) {
    return foundNode;
  }

  if (parentId) {
    const parentNode = children.find((n) => n.id === parentId);
    if (parentNode?.children) {
      return findNestedNode(nodeId, parentNode.children, parentId);
    }
  }

  // Check for nested children
  const nodesWithChildren = children.filter((n) => n.children?.length);
  // Iterate over all nested nodes and check if any of them contain the node
  for (const n of nodesWithChildren) {
    const foundChild = findNestedNode(nodeId, n.children, parentId);

    if (foundChild && Object.keys(foundChild).length) {
      return foundChild;
    }
  }

  return {};
}

