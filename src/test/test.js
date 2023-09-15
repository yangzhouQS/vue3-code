const strArray = [
  '-2/hr19.1',
  '-2/hr11.1/hr11.986437/hr11.236807',
  '-2/hr11.1/hr11.142688'
];

const treeData = [
  []
]

const nodeList = []
const ret = strArray.map(str => {
  const arr = str.split('/')
  for (let i = 0; i < arr.length; i++) {
    const id = arr[i];
    const lastId = arr[i - 1]
    let node = {
      fullId: id,
      pId: null,
      id: id
    }
    if (i === 0) {
      node.pId = null
    } else {
      node.pId = lastId
      node.fullId = lastId + '/' + id
    }
    nodeList.push(node)
  }
  return arr
})

const nodeMap = new Map();
nodeList.forEach(node => {
  nodeMap.set(node.id, node)
})
nodeList.forEach((node) => {
  const pNode = nodeMap.get(node.pId)
  if (node.pId) {
    if (pNode && Array.isArray(pNode.children)) {
      nodeMap.get(node.pId).children.push(node)
    } else {
      nodeMap.get(node.pId).children = [node]
    }
  }
})
const data = Array.from(nodeMap.values()).filter(node => node.pId==null)
console.log(JSON.stringify(data, null, 2))

