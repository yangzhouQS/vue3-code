const isType =
  <T>(type: string | string[]) =>
    (obj: unknown): obj is T =>
      obj != null &&
      (Array.isArray(type) ? type : [type]).some(
        (t) => getType(obj) === `[object ${t}]`
      )
export const getType = (obj: any) => Object.prototype.toString.call(obj)
export const isFn = isType<(...args: any[]) => any>([
  'Function',
  'AsyncFunction',
  'GeneratorFunction',
])
export const isWindow = isType<Window>('Window')
export const isHTMLElement = (obj: any): obj is HTMLElement => {
  return obj?.['nodeName'] || obj?.['tagName']
}
export const isArr = Array.isArray
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')
export const isValid = (val: any) => val !== null && val !== undefined
// 检测节点类型
export function isCommentNode(el: Element | Text | Comment | Node): el is Comment {
  return el.nodeType === 8;
}

export function isTextNode(el: Element | Text | Comment | Node): el is Text {
  return el.nodeType === 3;
}

export function isEmptyNode(el: Element | Text | Comment | Node): boolean {
  return isCommentNode(el) || (isTextNode(el) && el.nodeValue === '');
}
