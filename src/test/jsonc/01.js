import * as jsonc from 'jsonc-parser';
console.log(Object.keys(jsonc));
const obj = {
  a:1,
  b:2
}
console.log(jsonc.parseTree(JSON.stringify(obj)));
