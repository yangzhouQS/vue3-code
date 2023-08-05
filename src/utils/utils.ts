export const isWindow = typeof window !== "undefined"

// 判断参数是否是其中之一
export function oneOf(value: any, validList: any[]) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

function camelCase(name: string) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter;
  }).replace(MOZ_HACK_REGEXP, 'Moz$1');
}

// getStyle
export function getStyle(element, styleName) {
  if (!isWindow) return;
  if (!element || !styleName) return null;
  styleName = camelCase(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  try {
    const computed = document.defaultView?.getComputedStyle(element, '');
    return element.style[styleName] || computed ? computed[styleName] : null;
  } catch (e) {
    return element.style[styleName];
  }
}


export const emitter = () => {
  let listeners = {}

  const on = (event, callback, once = false) => {
    if (event && typeof event === 'string' && typeof callback === 'function') {
      const callbacks = listeners[event] || []

      listeners[event] = callbacks
      callbacks.push(callback)
      callback.once = once
    }
  }

  const emitter = {
    emit(eventName) {
      const callbacks = listeners[eventName]

      if (callbacks) {
        callbacks.forEach((callback) => callback.apply(null, [].slice.call(arguments, 1)))

        listeners[eventName] = callbacks.filter((callback) => !callback.once)
      }
    },
    on,
    once(event, callback) {
      on(event, callback, true)
    },
    off(event, callback) {
      if (event && typeof event === 'string') {
        const callbacks = listeners[event]

        if (typeof callback === 'function') {
          listeners[event] = callbacks.filter((cb) => cb !== callback)
        } else {
          delete listeners[event]
        }
      } else {
        listeners = {}
      }
    }
  }

  return emitter
}

export const bindFilter = (props, attrs = {}) => {
  const properties = {}

  for (let name in props) {
    if (name.indexOf('_') !== 0) {
      properties[name] = props[name]
    }
  }

  for (let name in attrs) {
    properties[name] = attrs[name]
  }

  return properties
}

/**
 * 根据类名生成对应的hover、active等类名
 *
 *     getElementStatusClass('border-color', 'hover') // 'border-color hover:border-color-hover'
 *     getElementStatusClass(['border-color'], ['hover', 'active']) // 'border-color hover:border-color-hover active:border-color-active'
 *
 * @method
 * @param {String|Array} className - 类名
 * @param {String|Array} status - 状态
 * @returns {String} - 类名拼接的字符串
 */
export const getElementStatusClass = (className, status) => {
  if (!className || !status) return

  let classNames: string[] = []
  if (typeof className === 'string') {
    classNames.push(className)
  } else if (Array.isArray(className)) {
    classNames = className
  }

  let statusList: string[] = []
  if (typeof status === 'string') {
    statusList.push(status)
  } else if (Array.isArray(status)) {
    statusList = status
  }

  let res: string[] = []
  statusList.forEach((status) => classNames.forEach((name) => res.push(`${status}:${name}-${status}`)))

  return classNames.concat(res).join(' ')
}

/**
 * 根据key值获取对应的classes类名配置
 *
 *     getElementCssClass({ button: 'border-color' }, 'button') // 'border-color'
 *     getElementCssClass({ button: 'border-color' }, { 'button': true }) // 'border-color'
 *
 * @method
 * @param {Object} classes - 类名集合
 * @param {String|Object} key - 状态
 * @returns {String} - 类名配置值
 */
export const getElementCssClass = (classes = {}, key) => {
  if (typeof key === 'object') {
    const keys = Object.keys(key)
    let cls = ''
    keys.forEach((k) => {
      if (key[k] && classes[k]) cls += `${classes[k]} `
    })
    return cls
  } else {
    return classes[key] || ''
  }
}




/**
 * 判断是否为null、undefined、空字符串
 *
 *     isNullOrEmpty('') // true
 *
 * @param {Object} value 需判断的对象
 * @return {Boolean}
 */
export const isNullOrEmpty = (value) => value === null || value === undefined || (typeof value === 'string' && value.trim().length === 0)

function cached(fn) {
  let cache = Object.create(null)

  return function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelizeRE = /-(\w)/g
export const camelize = cached((str) => str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : '')))

/**
 * 将字符串首写字母大写。
 *
 *     capitalize('hello')  // "Hello"
 *
 * @param {String} string 要转换的字符串
 * @returns {String}
 */
export const capitalize = cached((str) => str.charAt(0).toUpperCase() + str.slice(1))

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str) => str.replace(hyphenateRE, '-$1').toLowerCase())

/**
 * 解析Json字符串成对象。
 *
 *     let str = '{ "value": "v1", "text": "t1" }'
 *     toJson(str) // { value: 'v1', text: 't1' }
 *
 * @param {String} string 要解析的Json字符串
 * @returns {Object}
 */
export const toJson = (string) => {
  try {
    return JSON.parse(string)
  } catch (e) {
    return undefined
  }
}
