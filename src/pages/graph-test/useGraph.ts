import {parser} from "./utils/json/jsonParser";
import {EdgeData, NodeData} from "./types/models";


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

  // 获取元素的自定义属性
  getProperties: (id: string) => Object

  // 获取节点或边对象
  getModelById: (id: string) => Object

  // 获取节点或边的数据
  getDataById: (id: string) => Object


}

export const useGraph = {
  ...initialStates,
  setGraph: (data: string, options?: any) => {
    const result = parser(data)
    console.log('ret = ',result);
    useGraph.nodes = result.nodes
    useGraph.edges = result.edges
  },
  getState: () => {
    return {
      foldNodes: []
    }
  },

}
