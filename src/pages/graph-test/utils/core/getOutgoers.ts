import {EdgeData, NodeData} from "../../types/models";

type Outgoers = [NodeData[], string[]];
/**
 * 获取给定节点的所有出度节点和匹配的节点
 *
 * @param nodeId 给定节点的ID
 * @param nodes 节点数据数组
 * @param edges 边数据数组
 * @param parent 父节点ID数组（默认为空数组）
 * @returns 返回包含出度节点数组和匹配节点ID数组的元组
 */

export const getOutgoers = (
  nodeId: string,
  nodes: NodeData[],
  edges: EdgeData[],
  parent: string[] = []
): Outgoers => {
  const outgoerNodes: NodeData[] = [];
  const matchingNodes: string[] = [];

  if (parent.includes(nodeId)) {
    const initialParentNode = nodes.find(n => n.id === nodeId);

    if (initialParentNode) outgoerNodes.push(initialParentNode);
  }

  const findOutgoers = (currentNodeId: string) => {
    const outgoerIds = edges.filter(e => e.from === currentNodeId).map(e => e.to);
    const nodeList = nodes.filter(n => {
      if (parent.includes(n.id) && !matchingNodes.includes(n.id)) matchingNodes.push(n.id);
      return outgoerIds.includes(n.id) && !parent.includes(n.id);
    });

    outgoerNodes.push(...nodeList);
    nodeList.forEach(node => findOutgoers(node.id));
  };

  findOutgoers(nodeId);
  return [outgoerNodes, matchingNodes];
};
