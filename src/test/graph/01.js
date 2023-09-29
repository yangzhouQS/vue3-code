import {parseTree} from 'jsonc-parser'

const jsonData = {
  a: 1,
  b: 2,
  items: [
    {
      id: 1
    }
  ]
}

const treeData = parseTree(JSON.stringify(jsonData))

console.log(treeData);
function printJson(data) {
  console.log(JSON.stringify(data,null,2));
}
