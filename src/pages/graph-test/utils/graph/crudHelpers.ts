import {EdgeData, NodeData} from "../../types/models";

/**
 * 辅助函数，用于在边中插入或更新节点。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param edge 要插入或更新节点的边数据
 * @param newNode 要插入或更新的节点数据
 * @returns 返回一个对象，包含更新后的节点数组和边数组
 */
export function upsertNode(
  nodes: NodeData[],
  edges: EdgeData[],
  edge: EdgeData,
  newNode: NodeData
) {
  const oldEdgeIndex = edges.findIndex((e) => e.id === edge.id);
  const edgeBeforeNewNode = {
    ...edge,
    id: `${edge.from}-${newNode.id}`,
    to: newNode.id
  };
  const edgeAfterNewNode = {
    ...edge,
    id: `${newNode.id}-${edge.to}`,
    from: newNode.id
  };

  /*if (edge.fromPort && edge.toPort) {
    edgeBeforeNewNode.fromPort = edge.fromPort;
    edgeBeforeNewNode.toPort = `${newNode.id}-to`;

    edgeAfterNewNode.fromPort = `${newNode.id}-from`;
    edgeAfterNewNode.toPort = edge.toPort;
  }*/

  edges.splice(oldEdgeIndex, 1, edgeBeforeNewNode, edgeAfterNewNode);

  return {
    nodes: [...nodes, newNode],
    edges: [...edges]
  };
}

/**
 * 辅助函数，用于在边之间移除节点并连接子节点。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param removeNodes 要移除的节点数据或节点数据数组
 * @param onNodeLinkCheck 可选的回调函数，用于在连接节点之前进行检查。如果未定义或返回true，则连接节点；如果返回false，则不连接节点。
 * @returns 返回一个对象，包含更新后的节点数据数组和边数据数组
 */
export function removeAndUpsertNodes(
  nodes: NodeData[],
  edges: EdgeData[],
  removeNodes: NodeData | NodeData[],
  onNodeLinkCheck?: (
    newNodes: NodeData[],
    newEdges: EdgeData[],
    from: NodeData,
    to: NodeData,
    port?: any // PortData
  ) => undefined | boolean
) {
  if (!Array.isArray(removeNodes)) {
    removeNodes = [removeNodes];
  }

  const nodeIds = removeNodes.map((n) => n.id);
  const newNodes = nodes.filter((n) => !nodeIds.includes(n.id));
  const newEdges = edges.filter(
    (e) => !nodeIds.includes(e.from) && !nodeIds.includes(e.to)
  );

  for (const nodeId of nodeIds) {
    const sourceEdges = edges.filter((e) => e.to === nodeId);
    const targetEdges = edges.filter((e) => e.from === nodeId);

    for (const sourceEdge of sourceEdges) {
      for (const targetEdge of targetEdges) {
        const sourceNode = nodes.find((n) => n.id === sourceEdge.from);
        const targetNode = nodes.find((n) => n.id === targetEdge.to);
        if (sourceNode && targetNode) {
          const canLink = onNodeLinkCheck?.(
            newNodes,
            newEdges,
            sourceNode,
            targetNode
          );
          if (canLink === undefined || canLink) {
            newEdges.push({
              id: `${sourceNode.id}-${targetNode.id}`,
              from: sourceNode.id,
              to: targetNode.id,
              // parent: sourceNode?.parent
            });
          }
        }
      }
    }
  }

  return {
    edges: newEdges,
    nodes: newNodes
  };
}

/**
 * 辅助函数，用于移除节点及其相关的边。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param removeNodes 要移除的节点ID或节点ID数组
 * @returns 返回一个对象，包含更新后的节点数组和边数组
 */
export function removeNode(
  nodes: NodeData[],
  edges: EdgeData[],
  removeNodes: string | string[]
) {
  if (!Array.isArray(removeNodes)) {
    removeNodes = [removeNodes];
  }

  const newNodes = [];
  const newEdges = [];

  for (const node of nodes) {
    const has = removeNodes.some((n) => n === node.id);
    if (!has) {
      newNodes.push(node);
    }
  }

  for (const edge of edges) {
    const has = removeNodes.some((n) => n === edge.from || n === edge.to);
    if (!has) {
      newEdges.push(edge);
    }
  }

  return {
    nodes: newNodes,
    edges: newEdges
  };
}

/**
 * 辅助函数，用于移除与节点相关的边。
 *
 * @param nodeId 要移除相关边的节点ID
 * @param edges 边数据数组
 * @returns 返回更新后的边数据数组，已移除与指定节点相关的边
 */
export function removeEdgesFromNode(nodeId: string, edges: EdgeData[]) {
  return edges.filter((edge) => !(edge.to === nodeId || edge.from === nodeId));
}

/**
 * 移除边
 *
 * @param edges 边数据数组
 * @param edge 要移除的边数据或边数据数组
 * @returns 返回更新后的边数据数组，已移除指定的边
 */
export function removeEdge(edges: EdgeData[], edge: EdgeData | EdgeData[]) {
  const deletions: EdgeData[] = !Array.isArray(edge) ? [edge] : edge;
  const edgeIds = deletions.map((e) => e.id);
  return edges.filter((e) => !edgeIds.includes(e.id));
}

/**
 * 根据两个节点创建一个边。
 *
 * @param fromNode 起始节点数据
 * @param toNode 目标节点数据
 * @returns 返回一个包含边数据的对象，包括边的ID、起始节点ID、目标节点ID以及父节点ID
 */
export function createEdgeFromNodes(fromNode: NodeData, toNode: NodeData) {
  return {
    id: `${fromNode.id}-${toNode.id}`,
    from: fromNode.id,
    to: toNode.id,
    parent: toNode.parent
  };
}

/**
 * 添加一个节点和可选的边。
 *
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param node 要添加的节点数据
 * @param toNode 可选的目标节点数据，如果提供，则会创建一个从该节点到目标节点的边
 * @returns 返回一个对象，包含更新后的节点数组和边数组
 */
export function addNodeAndEdge(
  nodes: NodeData[],
  edges: EdgeData[],
  node: NodeData,
  toNode?: NodeData
) {
  return {
    nodes: [...nodes, node],
    edges: [...edges, ...(toNode ? [createEdgeFromNodes(toNode, node)] : [])]
  };
}
