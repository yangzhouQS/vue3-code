import { Node, NodeType } from "jsonc-parser";
import { Graph, States } from "../json/jsonParser";
import { addEdgeToGraph } from "./addEdgeToGraph";
import { addNodeToGraph } from "./addNodeToGraph";

type PrimitiveOrNullType = "boolean" | "string" | "number" | "null";

const isPrimitiveOrNullType = (type: unknown): type is PrimitiveOrNullType => {
  return ["boolean", "string", "number", "null"].includes(type as string);
};

const alignChildren = (nodeA: Node, nodeB: Node): number => {
  const aChildType = nodeA?.children?.[1]?.type;
  const bChildType = nodeB?.children?.[1]?.type;

  if (isPrimitiveOrNullType(aChildType) && !isPrimitiveOrNullType(bChildType)) {
    return -1;
  }

  return 0;
};

function handleNoChildren(
  value: string | undefined,
  states: States,
  graph: Graph,
  myParentId?: string,
  parentType?: string,
  nextType?: string
) {
  if (value === undefined) return;

  if (parentType === "property" && nextType !== "object" && nextType !== "array") {
    states.brothersParentId = myParentId;
    if (nextType === undefined && Array.isArray(states.brothersNode)) {
      states.brothersNode.push([states.brotherKey, value]);
    } else {
      states.brotherKey = value;
    }
  } else if (parentType === "array") {
    const nodeFromArrayId = addNodeToGraph({ graph, text: String(value) });

    if (myParentId) {
      addEdgeToGraph(graph, myParentId, nodeFromArrayId);
    }
  }

  if (nextType && parentType !== "array" && (nextType === "object" || nextType === "array")) {
    states.parentName = value;
  }
}

/**
 * 处理具有子节点的节点
 *
 * @param type 节点类型
 * @param states 状态对象，包含父节点名称、兄弟节点等属性
 * @param graph 图对象，包含节点和边
 * @param children 子节点数组
 * @param myParentId 当前节点的父节点ID（可选）
 * @param parentType 父节点类型（可选）
 */
function handleHasChildren(
  type: NodeType,
  states: States,
  graph: Graph,
  children: Node[],
  myParentId?: string,
  parentType?: string
) {
  let parentId: string | undefined;

  // 如果节点类型不是属性，并且父节点名称不为空
  if (type !== "property" && states.parentName !== "") {
    // 添加最后一个兄弟节点并添加父节点

    // 如果兄弟节点数组长度大于0
    if (states.brothersNode.length > 0) {
      // 在兄弟节点属性数组中找到匹配的兄弟节点
      const findBrothersNode = states.brothersNodeProps.find(
        e =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
      );

      // 如果找到了匹配的兄弟节点
      if (findBrothersNode) {
        // 在图中找到该兄弟节点的索引
        const findNodeIndex = graph.nodes.findIndex(e => e.id === findBrothersNode?.id);

        // 如果找到了该兄弟节点
        if (findNodeIndex !== -1) {
          // 创建节点的副本
          const modifyNodes = [...graph.nodes];
          const foundNode = modifyNodes[findNodeIndex];

          // 将兄弟节点文本追加到找到的节点文本中
          foundNode.text = foundNode.text.concat(states.brothersNode as any);
          /*const { width, height } = calculateNodeSize(foundNode.text, false);

          foundNode.width = width;
          foundNode.height = height;*/

          // 更新图中的节点
          graph.nodes = modifyNodes;
          // 清空兄弟节点数组
          states.brothersNode = [];
        }
      } else {
        // 如果没有找到匹配的兄弟节点，则创建新的兄弟节点
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });

        // 清空兄弟节点数组
        states.brothersNode = [];

        // 如果兄弟节点的父节点ID存在
        if (states.brothersParentId) {
          // 在图中添加从父节点到兄弟节点的边
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
        } else {
          // 将兄弟节点ID添加到没有父节点的节点数组中
          states.notHaveParent.push(brothersNodeId);
        }

        // 将兄弟节点属性添加到兄弟节点属性数组中
        states.brothersNodeProps.push({
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        });
      }
    }

    // 添加父节点
    parentId = addNodeToGraph({ graph, type, text: states.parentName });
    // 将父节点ID和类型添加到括号打开数组中
    states.bracketOpen.push({ id: parentId, type });
    // 清空父节点名称
    states.parentName = "";

    // 从父节点添加边
    const brothersProps = states.brothersNodeProps.filter(
      e =>
        e.parentId === myParentId &&
        e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
    );

    // 如果兄弟节点属性数组长度大于0，并且括号打开数组倒数第二个元素的类型不是对象，或者括号打开数组长度为1
    if (
      (brothersProps.length > 0 &&
        states.bracketOpen[states.bracketOpen.length - 2]?.type !== "object") ||
      (brothersProps.length > 0 && states.bracketOpen.length === 1)
    ) {
      // 在图中添加从最后一个兄弟节点到父节点的边
      addEdgeToGraph(graph, brothersProps[brothersProps.length - 1].id, parentId);
    } else if (myParentId) {
      // 在图中添加从当前节点的父节点到父节点的边
      addEdgeToGraph(graph, myParentId, parentId);
    } else {
      // 将父节点ID添加到没有父节点的节点数组中
      states.notHaveParent.push(parentId);
    }
  } else if (parentType === "array") {
    // 如果父节点类型是数组，则将对象数组ID递增并添加到对象数组中
    states.objectsFromArray = [...states.objectsFromArray, states.objectsFromArrayId++];
  }

  // 遍历对象节点的函数
  const traverseObject = (objectToTraverse: Node, nextType: string) => {
    traverse({
      states,
      objectToTraverse,
      parentType: type,
      myParentId: states.bracketOpen[states.bracketOpen.length - 1]?.id,
      nextType,
    });
  };

  // 遍历数组节点的函数
  const traverseArray = () => {
    // 遍历子节点数组
    children.forEach((objectToTraverse, index, array) => {
      const nextType = array[index + 1]?.type;

      // 调用遍历对象节点的函数
      traverseObject(objectToTraverse, nextType);
    });
  };

  // 如果节点类型是对象
  if (type === "object") {
    // 对子节点数组进行排序
    children.sort(alignChildren);
    // 调用遍历数组节点的函数
    traverseArray();
  } else {
    // 调用遍历数组节点的函数
    traverseArray();
  }

  // 如果节点类型不是属性
  if (type !== "property") {
    // 当它是最后一个父节点时，添加或连接兄弟节点
    if (states.brothersNode.length > 0) {
      // 在兄弟节点属性数组中找到匹配的兄弟节点
      const findBrothersNode = states.brothersNodeProps.find(
        e =>
          e.parentId === states.brothersParentId &&
          e.objectsFromArrayId === states.objectsFromArray[states.objectsFromArray.length - 1]
      );

      // 如果找到了匹配的兄弟节点
      if (findBrothersNode) {
        // 创建节点的副本
        const modifyNodes = [...graph.nodes];
        // 在副本中找到匹配的兄弟节点的索引
        const findNodeIndex = modifyNodes.findIndex(e => e.id === findBrothersNode?.id);

        // 如果找到了该兄弟节点，并且兄弟节点是字符串类型
        if (modifyNodes[findNodeIndex] && typeof states.brothersNode === "string") {
          // 将兄弟节点文本追加到找到的节点文本中
          modifyNodes[findNodeIndex].text += states.brothersNode;

          /*const { width, height } = calculateNodeSize(modifyNodes[findNodeIndex].text, false);

          modifyNodes[findNodeIndex].width = width;
          modifyNodes[findNodeIndex].height = height;*/

          // 更新图中的节点
          graph.nodes = modifyNodes;
          // 清空兄弟节点数组
          states.brothersNode = [];
        }
      } else {
        // 如果没有找到匹配的兄弟节点，则创建新的兄弟节点
        const brothersNodeId = addNodeToGraph({ graph, text: states.brothersNode });

        // 清空兄弟节点数组
        states.brothersNode = [];

        // 如果兄弟节点的父节点ID存在
        if (states.brothersParentId) {
          // 在图中添加从父节点到兄弟节点的边
          addEdgeToGraph(graph, states.brothersParentId, brothersNodeId);
        } else {
          // 将兄弟节点ID添加到没有父节点的节点数组中
          states.notHaveParent = [...states.notHaveParent, brothersNodeId];
        }

        // 创建兄弟节点属性对象
        const brothersNodeProps = {
          id: brothersNodeId,
          parentId: states.brothersParentId,
          objectsFromArrayId: states.objectsFromArray[states.objectsFromArray.length - 1],
        };

        // 将兄弟节点属性添加到兄弟节点属性数组中
        states.brothersNodeProps = [...states.brothersNodeProps, brothersNodeProps];
      }
    }

    // 关闭括号
    if (parentType === "array") {
      // 如果对象数组长度大于0，则弹出最后一个元素
      if (states.objectsFromArray.length > 0) {
        states.objectsFromArray.pop();
      }
    } else {
      // 如果括号打开数组长度大于0，则弹出最后一个元素
      if (states.bracketOpen.length > 0) {
        states.bracketOpen.pop();
      }
    }

    // 如果父节点ID存在
    if (parentId) {
      // 获取父节点的子节点
      const myChildren = graph.edges.filter(edge => edge.from === parentId);
      // 在图中找到父节点的索引
      const parentIndex = graph.nodes.findIndex(node => node.id === parentId);

      // 更新图中的节点，将父节点的子节点数量添加到节点数据中
      graph.nodes = graph.nodes.map((node, index) => {
        if (index === parentIndex) {
          const childrenCount = myChildren.length;

          return { ...node, data: { ...node.data, childrenCount } };
        }
        return node;
      });
    }
  }
}


type Traverse = {
  states: States;
  objectToTraverse: Node;
  parentType?: string;
  myParentId?: string;
  nextType?: string;
};

export const traverse = ({
  objectToTraverse,
  states,
  myParentId,
  nextType,
  parentType,
}: Traverse) => {
  const graph = states.graph;
  const { type, children, value } = objectToTraverse;

  if (!children) {
    handleNoChildren(value, states, graph, myParentId, parentType, nextType);
  } else if (children) {
    handleHasChildren(type, states, graph, children, myParentId, parentType);
  }
};
