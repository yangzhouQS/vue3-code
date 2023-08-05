import {parseTree} from "jsonc-parser";
import {EdgeData, NodeData} from "@/pages/graph-test/types/models";
import {traverse} from "@/pages/graph-test/utils/core/traverse";
import {addNodeToGraph} from "@/pages/graph-test/utils/core/addNodeToGraph";
import {addEdgeToGraph} from "@/pages/graph-test/utils/core/addEdgeToGraph";
import {getNodePath} from "@/pages/graph-test/utils/json/getNodePath";

export type Graph = {
  nodes: NodeData[];
  edges: EdgeData[];
};


export type States = {
  parentName: string;
  bracketOpen: { id: string; type: string }[];
  objectsFromArray: number[];
  objectsFromArrayId: number;
  notHaveParent: string[];
  brothersNode: [string, string][] | string;
  brothersParentId: string | undefined;
  brotherKey: string;
  brothersNodeProps: {
    id: string;
    parentId: string | undefined;
    objectsFromArrayId: number | undefined;
  }[];
  graph: Graph;
};

function initializeStates(): States {
  return {
    parentName: "",
    bracketOpen: [],
    objectsFromArray: [],
    objectsFromArrayId: 0,
    notHaveParent: [],
    brothersNode: [],
    brothersParentId: undefined,
    brotherKey: "",
    brothersNodeProps: [],
    graph: {
      nodes: [],
      edges: [],
    },
  };
}


export function parser(jsonStr: string): Graph {
  try {
    const states = initializeStates();
    const parsedJsonTree = parseTree(jsonStr);
    if (!parsedJsonTree) {
      throw new Error("Invalid document");
    }

    traverse({ states, objectToTraverse: parsedJsonTree });
    const { notHaveParent, graph } = states;


    debugger
    if (notHaveParent.length > 1 && parsedJsonTree.type !== "array") {
      const emptyNode = { id: null, text: "", isEmpty: true, data: {} };
      const emptyId = addNodeToGraph({ graph, ...emptyNode });

      notHaveParent.forEach(childId => addEdgeToGraph(graph, emptyId, childId));
    }

    if (states.graph.nodes.length === 0) {
      if (parsedJsonTree.type === "array") {
        addNodeToGraph({ graph: states.graph, text: "[]" });
      } else {
        addNodeToGraph({ graph: states.graph, text: "{}" });
      }
    }

    states.graph.nodes = states.graph.nodes.map(node => ({
      ...node,
      path: getNodePath(states.graph.nodes, states.graph.edges, node.id),
    }));

    return states.graph;
  } catch (error) {
    console.error(error);
    return {
      nodes: [],
      edges: []
    };
  }
}
