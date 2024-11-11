import {Graph} from "../json/jsonParser";
/**
 * 向图中添加一条边
 *
 * @param graph 图对象，包含节点和边的数组
 * @param from 边的起始节点名称
 * @param to 边的目标节点名称
 */
export const addEdgeToGraph = (graph: Graph, from: string, to: string) => {
  const newEdge = {
    id: `e${from}-${to}`,
    from: from,
    to: to,
  };

  graph.edges.push(newEdge);
};
