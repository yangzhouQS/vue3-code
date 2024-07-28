function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}
console.log(isObject({}));
console.log(isObject(null));
