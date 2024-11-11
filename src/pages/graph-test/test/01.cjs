const {parseTree} = require('jsonc-parser');

const obj = {
  a: 1,
  a1: 'abc',
  a2: false,
  a3: [1, 2, 3, 4, 5]
}

const parsedJsonTree = parseTree(JSON.stringify(obj));
console.log(parsedJsonTree);
