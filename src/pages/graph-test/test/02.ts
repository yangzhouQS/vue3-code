

type Node = {
  __nodeId: string;
  __nodeName: string;
  __nodeType: string;
  __nodeEvent?: object;
  __nodeOptions?: object;
  __nodeKey?: string;
  __description?: string;
  showName?: string;
  children?: Node[];
  parent?: Node;
  // ... 其他可能的属性
};

class NodeManager {
  private nodes: Node[] = [];

  constructor(initialNodes: Node[] = []) {
    this.nodes = initialNodes;
    this.buildHierarchy();
  }

  private buildHierarchy(): void {
    const nodeMap: { [key: string]: Node } = {};
    this.nodes.forEach(node => {
      nodeMap[node.__nodeId] = node;
      node.children = node.children || [];
    });

    this.nodes.forEach(node => {
      if (node.__nodeOptions?.parentNodeId) {
        const parentNode = nodeMap[node.__nodeOptions.parentNodeId];
        if (parentNode) {
          parentNode.children!.push(node);
          node.parent = parentNode;
        }
      }
    });
  }

  // 查找节点
  findNode(nodeId: string): Node | undefined {
    return this.nodes.find(node => node.__nodeId === nodeId);
  }

  // 添加节点
  addNode(node: Node): void {
    if (this.findNode(node.__nodeId)) {
      throw new Error(`Node with id ${node.__nodeId} already exists.`);
    }
    this.nodes.push(node);
    this.buildHierarchy();
  }

  // 删除节点
  deleteNode(nodeId: string): void {
    const index = this.nodes.findIndex(node => node.__nodeId === nodeId);
    if (index === -1) {
      throw new Error(`Node with id ${nodeId} not found.`);
    }
    this.nodes.splice(index, 1);
    this.buildHierarchy();
  }

  // 更新节点
  updateNode(nodeId: string, updatedNode: Partial<Node>): void {
    const index = this.nodes.findIndex(node => node.__nodeId === nodeId);
    if (index === -1) {
      throw new Error(`Node with id ${nodeId} not found.`);
    }
    this.nodes[index] = { ...this.nodes[index], ...updatedNode };
    this.buildHierarchy();
  }

  // 获取所有节点
  getAllNodes(): Node[] {
    return this.nodes;
  }

  // 获取当前节点的父节点
  getParentNode(nodeId: string): Node | undefined {
    const node = this.findNode(nodeId);
    return node ? node.parent : undefined;
  }

  // 获取当前节点的子节点
  getChildNodes(nodeId: string): Node[] {
    const node = this.findNode(nodeId);
    return node ? node.children || [] : [];
  }

  // 根据 __nodeId 查询当前节点的原始数据
  getOriginalNodeData(nodeId: string): Node | undefined {
    return this.findNode(nodeId);
  }

  // 根据 __nodeId 查询当前节点的原始父节点配置数据
  getOriginalParentNodeConfig(nodeId: string): Node | undefined {
    const node = this.findNode(nodeId);
    return node ? node.parent : undefined;
  }

  // 根据 __nodeId 判断当前配置是否在数组中
  isConfigInArray(nodeId: string): boolean {
    return this.nodes.some(node => node.__nodeId === nodeId);
  }

  // 将嵌套数据结构转换为 JSON
  toJSON(): string {
    return JSON.stringify(this.nodes, null, 2);
  }
}

// 使用示例
const initialNodes = [/* ...从 JSON 文件加载的节点数据... */];
const nodeManager = new NodeManager(initialNodes);

// 查找节点
const node = nodeManager.findNode('someNodeId');

// 添加节点
const newNode: Node = {
  __nodeId: 'newNodeId',
  __nodeName: 'New Node',
  __nodeType: 'baseNode',
  // ... 其他属性
};
nodeManager.addNode(newNode);

// 删除节点
nodeManager.deleteNode('someNodeId');

// 更新节点
nodeManager.updateNode('someNodeId', { __nodeName: 'Updated Node Name'
