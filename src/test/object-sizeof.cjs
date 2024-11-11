const sizeof = require('object-sizeof')
const sizeObj = sizeof({ abc: 'def' })
console.log(`Size of the object: ${sizeObj} bytes`)
const sizeInt = sizeof(12345)
console.log(`Size of the int: ${sizeInt} bytes`)

console.log(sizeof([]));
console.log(sizeof({}));
