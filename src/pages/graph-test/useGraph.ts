import {NodeType} from "jsonc-parser";
import {EdgeData, NodeData} from "@/pages/graph-test/types/models";
import {parser} from "@/pages/graph-test/utils/json/jsonParser";


export interface Graph {
  zoomPanPinch: null;
  direction: string;
  loading: boolean;
  graphCollapsed: boolean;
  foldNodes: boolean;
  fullscreen: boolean;
  nodes: NodeData[];
  edges: EdgeData[];
  collapsedNodes: string[];
  collapsedEdges: string[];
  collapsedParents: string[];
  selectedNode: NodeData | null;
  path: string;
}

const initialStates: Graph = {
  zoomPanPinch: null,
  direction: "RIGHT",
  loading: true,
  graphCollapsed: false,
  foldNodes: false,
  fullscreen: false,
  nodes: [],
  edges: [],
  collapsedNodes: [],
  collapsedEdges: [],
  collapsedParents: [],
  selectedNode: null,
  path: "",
};


interface GraphActions {
  setGraph: (json?: string, options?: Partial<Graph>[]) => void;
  setLoading: (loading: boolean) => void;
  setDirection: (direction: CanvasDirection) => void;
  setZoomPanPinch: (ref: any | null) => void;
  setSelectedNode: (nodeData: NodeData) => void;
  expandNodes: (nodeId: string) => void;
  expandGraph: () => void;
  collapseNodes: (nodeId: string) => void;
  collapseGraph: () => void;
  toggleFold: (value: boolean) => void;
  toggleFullscreen: (value: boolean) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  centerView: () => void;
  clearGraph: () => void;
}

export const useGraph = {
  ...initialStates,
  setGraph: (data: string, options?: any) => {
    const result = parser(data)
    debugger
  },
  getState: () => {
    return {
      foldNodes: []
    }
  },

}
