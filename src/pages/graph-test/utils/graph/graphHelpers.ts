import {EdgeData, NodeData} from "@/pages/graph-test/types/models";


/**
 * Get sources pointing to a node.
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
 * Given a node id, get all the parent nodes recursively.
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
