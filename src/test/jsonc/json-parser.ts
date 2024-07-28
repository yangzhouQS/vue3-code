
import * as jsonc from 'jsonc-parser';
console.log(Object.keys(jsonc));



function parser() {
  const obj = {
    a:1,
    b:2
  }
  const parsedJsonTree = jsonc.parseTree(JSON.stringify(obj))
}
