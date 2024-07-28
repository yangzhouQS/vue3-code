import * as lodash from "lodash";
const {isUndefined,isNumber,get} = lodash;
import * as utils from "./utils.js";

export const after = (array, n) => {
  if (lodash.isUndefined(array)) return ''
  return array.slice(n)
}

export const arrayify = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  return [val]
}

export const before = (array, n) => {
  if (lodash.isUndefined(array)) return ''
  return array.slice(0, -n)
}

/**
 * ```handlebars
 * <!-- array: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] -->
 * {{#eachIndex array}}
 *   {{item}} is {{index}}
 * {{/eachIndex}}
 * ```
 * @param array
 * @param options
 * @returns {string}
 */
export const eachIndex = (array, options) => {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += options.fn({item: array[i], index: i});
  }
  return result;
}


/**
 * Block helper that filters the given array and renders the block for values that
 * evaluate to `true`, otherwise the inverse block is returned.
 *
 * ```handlebars
 * <!-- array: ['a', 'b', 'c'] -->
 * {{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
 * <!-- results in: 'BBB' -->
 * ```
 * @param {Array} `array`
 * @param {any} `value`
 * @param {Object} `options`
 * @return {String}
 * @block
 * @api public
 */
export const filter = function (array, value, options) {
  var content = '';
  var results = [];

  // filter on a specific property
  var prop = options.hash && (options.hash.property || options.hash.prop);
  if (prop) {
    results = array.filter(function (val) {
      return value === get(val, prop);
    });
  } else {

    // filter on a string value
    results = array.filter(function (v) {
      return value === v;
    });
  }

  if (results && results.length > 0) {
    for (var i = 0; i < results.length; i++) {
      content += options.fn(results[i]);
    }
    return content;
  }
  return options.inverse(this);
};

export const first = (array, n) => {
  if (isUndefined(array)) return ''
  if (!isNumber(n)) return array[0]
  return array.slice(0, n)
}



/**
 * Iterates over each item in an array and exposes the current item
 * in the array as context to the inner block. In addition to
 * the current array item, the helper exposes the following variables
 * to the inner block:
 *
 * - `index`
 * - `total`
 * - `isFirst`
 * - `isLast`
 *
 * Also, `@index` is exposed as a private variable, and additional
 * private variables may be defined as hash arguments.
 *
 * ```handlebars
 * <!-- accounts = [
 *   {'name': 'John', 'email': 'john@example.com'},
 *   {'name': 'Malcolm', 'email': 'malcolm@example.com'},
 *   {'name': 'David', 'email': 'david@example.com'}
 * ] -->
 *
 * {{#forEach accounts}}
 *   <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
 *     {{ name }}
 *   </a>{{#unless isLast}}, {{/unless}}
 * {{/forEach}}
 * ```
 * @source <http://stackoverflow.com/questions/13861007>
 * @param {Array} `array`
 * @return {String}
 * @block
 * @api public
 */
export const forEach = (array,options) => {
  let data = utils.createFrame(options, options.hash);
  let len = array.length;
  let buffer = '';
  let i = -1;

  while (++i < len) {
    let item = array[i];
    data.index = i;
    item.index = i + 1;
    item.total = len;
    item.isFirst = i === 0;
    item.isLast = i === (len - 1);
    buffer += options.fn(item, {data: data});
  }
  return buffer;
}
