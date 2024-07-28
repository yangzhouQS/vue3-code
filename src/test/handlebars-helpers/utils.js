const hasOwn = Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);

export function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

/**
 * 将私有变量添加到 handlebars block helpers.
 * @param data
 * @returns {{}}
 */
export function createFrame(data) {
  if (!isObject(data)) {
    throw new TypeError('createFrame expects data to be an object');
  }
  const frame = Object.assign({},data);
  frame._parent = data;

  defineProperty(frame, 'extend', function (data) {
    Object.assign(this, data);
  });
  if (arguments.length > 1) {
    const args = [].slice.call(arguments, 1);
    let len = args.length, i = -1;
    while (++i < len) {
      frame.extend(args[i] || {});
    }
  }

  return frame;
}


export function defineProperty(obj, key, val) {
  if (!isObject(obj) && typeof obj !== 'function' && !Array.isArray(obj)) {
    throw new TypeError('expected an object, function, or array');
  }

  if (typeof key !== 'string') {
    throw new TypeError('expected "key" to be a string');
  }

  if (isDescriptor(val)) {
    Reflect.defineProperty(obj, key, val);
    return obj
  }

  Reflect.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });

  return obj;
}

/**
 * 判断是否为数据描述符 参数
 * @param obj
 * @param key
 * @returns {boolean}
 */
function isDataDescriptor(obj, key) {
  if (!isObject(obj)) {
    return false;
  }

  let desc = arguments.length > 1 ? Reflect.getOwnPropertyDescriptor(obj, key) : obj;

  if (isObject(desc)) {
    if (
      !hasOwn(desc, 'value')
      || hasOwn(desc, 'get')
      || hasOwn(desc, 'set')
      || (hasOwn(desc, 'configurable') && typeof desc.configurable !== 'boolean')
      || (hasOwn(desc, 'enumerable') && typeof desc.enumerable !== 'boolean')
      || (hasOwn(desc, 'writable') && typeof desc.writable !== 'boolean')
    ) {
      return false;
    }
    for (var descKey in desc) { // eslint-disable-line no-restricted-syntax
      if (
        hasOwn(desc, descKey)
        && descKey !== 'configurable'
        && descKey !== 'enumerable'
        && descKey !== 'writable'
        && descKey !== 'value'
      ) {
        return false;
      }
    }
    return true
  } else {
    return false;
  }
  return false
}

/**
 * 包含get和set的描述符判断
 * @param obj
 * @returns {boolean}
 */
function isAccessorDescriptor(obj,) {
  if (!isObject(obj)) {
    return false;
  }
  const desc = obj;
  if (
    !hasOwn(desc, 'get')
    || !hasOwn(desc, 'set')
    || !hasOwn(desc, 'enumerable')
    || !hasOwn(desc, 'configurable')
  ) {
    return false;
  }

  for (const descKey in desc) {
    if (hasOwn(desc, descKey)) {
      if (
        descKey !== 'get'
        && descKey !== 'set'
        && descKey !== 'enumerable'
        && descKey !== 'configurable'
      ) {
        return false;
      }

      var val = desc[descKey];
      if (descKey === 'get' || descKey === 'set') {
        if (typeof val !== 'undefined' && typeof val !== 'function') {
          return false;
        }
      } else if (typeof val !== 'boolean') {
        return false;
      }
    }
  }
  return true;
}

/**
 * 判断参数是否为描述符
 * @param desc
 * @returns {boolean}
 */
function isDescriptor(obj) {
  if (!isObject(obj)) {
    return false;
  }

  const desc = obj;
  if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
    return false;
  }

  return isDataDescriptor(desc) || isAccessorDescriptor(desc);
}

/*
console.log('11 isDescriptor = ', isDescriptor({
  writable: false,
  configurable: false,
  enumerable: false,
  value: 'foo'
}));// true

console.log('22 isDescriptor = ', isDescriptor({
  configurable: false,
  enumerable: false,
  get() {
  },
  set() {
  },
}));


console.log('22 isDescriptor = ', isDescriptor({
  configurable: false,
  enumerable: false,
  get: "foo",
  set() {
  },
})); // false
*/

