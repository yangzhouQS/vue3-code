

type Node = {
  __nodeId: string;
  __nodeType: string;
  __nodeName: string;
  __nodeOptions?: {
    [key: string]: any;
  };
  __nodeEvent?: { [key: string]: any };
  [key: string]: any;
};

class NodeManager {
  private nodes: Map<string, Node>;

  constructor(data: Node) {
    this.nodes = new Map();
    this.flattenNodes(data);
  }

  private flattenNodes(node: Node, parentId: string | null = null) {
    const nodeCopy = { ...node, parentId };
    this.nodes.set(node.__nodeId, nodeCopy);

    if (node.__nodeOptions) {
      const options = node.__nodeOptions;
      for (const key in options) {
        const child = options[key];
        if (Array.isArray(child)) {
          child.forEach((c: Node) => this.flattenNodes(c, node.__nodeId));
        } else if (typeof child === "object" && child.__nodeId) {
          this.flattenNodes(child, node.__nodeId);
        }
      }
    }
  }

  toArray(): Node[] {
    return Array.from(this.nodes.values());
  }
}

// 用法示例
const jsonData = /* 从文件加载的 JSON 数据 */;
const manager = new NodeManager(jsonData);

// 将 JSON 转换为数组
const nodeArray = manager.toArray();
console.log(nodeArray);

