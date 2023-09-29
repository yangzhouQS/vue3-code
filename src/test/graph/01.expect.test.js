import {it, expect, test, describe, assert} from 'vitest'

describe("json测试", () => {
  it("1,toBe === 可以用于断言原始类型是否相等，或者对象是否共享相同的引用", () => {
    expect(1 + 2).toBe(3)

    expect(Math.sqrt(4)).toBe(2)
    expect(Math.sqrt(144)).toBe(12)
    expect(Math.sqrt(2)).toBe(Math.SQRT2)


    const input = {
      foo: 'hello',
      bar: 'world',
    }

    const output = JSON.stringify(input)

    expect(output).eq('{"foo":"hello","bar":"world"}')


    assert.deepEqual(JSON.parse(output), input, 'xxx')
  })


  test("2,not != 不等于测试, 使用 not 将否定断言", () => {
    expect(1 + 2).not.to.equal(2)
    expect(1 + 2).not.toBe(4)
  })

  test('3, val != undefined toBeDefined 断言该值不等于 undefined。一个有用的用例是检查函数是否 返回 了任何值', () => {
    expect(undefined).not.toBeDefined()
    expect(null).toBeDefined()
    expect('undefined').toBeDefined()
    expect('').toBeDefined()
    expect(NaN).toBeDefined()
  })

  test('4, val === undefined 与 toBeDefined 相反，toBeUndefined 断言该值 等于 undefined。一个有用的用例是检查函数是否没有 返回 任何值', () => {
    expect(undefined).toBeUndefined()
    expect('undefined').not.toBeUndefined()
    expect(null).not.toBeUndefined()
    expect('').not.toBeUndefined()
    expect(NaN).not.toBeUndefined()
  })

  test('5,toBeTruthy 断言该值在转换为布尔值时为 true', () => {
    expect(1).toBeTruthy()
    expect('1').toBeTruthy()
    expect(true).toBeTruthy()
    expect('ccdss').toBeTruthy()

    // 在 JavaScript 中，除了 false、0、''、null、undefined 和 NaN 之外，所有值都是真值
    expect(false).not.toBeTruthy()
    expect(0).not.toBeTruthy()
    expect('').not.toBeTruthy()
    expect(null).not.toBeTruthy()
    expect(undefined).not.toBeTruthy()
    expect(NaN).not.toBeTruthy()
  })


  test('6,toBeFalsy 断言该值在转换为布尔值时为 false', () => {
    //   在 JavaScript 中，除了 false、0、''、null、undefined 和 NaN 之外，所有值都是真值。
    expect(false).toBeFalsy()
    expect(0).toBeFalsy()
    expect('').toBeFalsy()
    expect(null).toBeFalsy()
    expect(undefined).toBeFalsy()
    expect(NaN).toBeFalsy()
  })

  test('7,toBeNull 简单地断言某个值是否为 null。是 .toBe(null) 的别名', () => {
    expect(null).toBeNull()
    expect(false).not.toBeNull()
  })


  it('8,toBeNaN 简单地断言某个值是否为 NaN。是 .toBe(NaN) 的别名', () => {
    expect(NaN).toBeNaN()
    expect(NaN).toBe(NaN)
    expect(Number('aaaa222')).toBeNaN()
    expect(null).not.toBeNaN()
    expect('').not.toBeNaN()
    expect(1 / 0).not.toBeNaN()
  });

  // (c: 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined') => Awaitable<void>
  it('9,toBeTypeOf 断言实际值是否为接收到的类型', () => {
    expect(() => {
    }).toBeTypeOf('function')
    expect(false).toBeTypeOf('boolean')
    expect(111).toBeTypeOf('number')
    expect({}).toBeTypeOf('object')
    expect('{}').toBeTypeOf('string')
    expect(Symbol()).toBeTypeOf('symbol')
    expect(undefined).toBeTypeOf('undefined')
  });

  it('10,toBeInstanceOf 断言实际值是否为接收到的类的实例', () => {
    expect([]).toBeInstanceOf(Array)
    expect({}).toBeInstanceOf(Object)
    expect(() => {
    }).toBeInstanceOf(Function)
    expect(new Error()).toBeInstanceOf(Error)
    expect(new SyntaxError()).toBeInstanceOf(Error)
  });

  it('11, [input > val] toBeGreaterThan 断言实际值是否大于接收到的值。相等的值将导致测试失败。 ', () => {
    expect(11).toBeGreaterThan(10)

    expect(11).not.toBeGreaterThan(22)
  });

  it('12,[input >= val ]toBeGreaterThanOrEqual 断言实际值是否大于或等于接收到的值 ', () => {
    expect(11).toBeGreaterThanOrEqual(10)
    expect(11).toBeGreaterThanOrEqual(11)

    expect(11).not.toBeGreaterThanOrEqual(22)
  });

  it('13,[input < val ]toBeLessThan 断言实际值是否小于接收到的值。相等的值将导致测试失败', () => {
    expect(5).toBeLessThan(10)
    expect(5).toBeLessThan(11)

    expect(50).not.toBeLessThan(22)
  });


  it('14,[input <= val ]toBeLessThanOrEqual 断言实际值是否小于或等于接收到的值', () => {
    expect(5).toBeLessThanOrEqual(10)
    expect(5).toBeLessThanOrEqual(11)

    expect(50).not.toBeLessThanOrEqual(22)
  });


  // 对于 Error 对象，不会执行 深度相等性。要测试是否抛出了某些内容，请使用 toThrowError 断言。
  it('15,toEqual 断言实际值是否等于接收到的值或具有相同的结构（如果是对象，则递归比较它们）', () => {
    const input = {a: 1, b: {a: 2, c: 2}}
    const input2 = {a: 1, b: 2}

    expect(input).toEqual(JSON.parse(JSON.stringify(input)))


    // 不会检查值为undefined的对象属性
    expect(input).toEqual({a: 1, b: {a: 2, c: 2, d: undefined}, name: undefined})

    expect(input).not.toEqual({a: '1', b: {a: 2, c: 2}})
    expect(input2).not.toBe({a: 1, b: 2})
  });


  /*
    检查具有 undefined 属性的键。例如，使用 .toStrictEqual 时，{a: undefined, b: 2} 不匹配 {b: 2}。
    检查数组的稀疏性。例如，使用 .toStrictEqual 时，[, 1] 不匹配 [undefined, 1]。
    检查对象类型是否相等。例如，具有字段 a 和 b 的类实例将不等于具有字段 a 和 b 的字面对象。
  */
  it('16,toStrictEqual 断言实际值是否等于接收到的值或具有相同的结构（如果是对象，则递归比较它们）', () => {
    const input = {a: 1, b: {a: 2, c: 2}}
    const input2 = {a: 1, b: 2}

    // undefined将会进行严格比较
    expect(input).not.toStrictEqual({a: 1, b: {a: 2, c: 2, d: undefined}, name: undefined})
    expect(input).toEqual({a: 1, b: {a: 2, c: 2, d: undefined}, name: undefined})
  });

  it('17,toContain 断言实际值是否在数组中。toContain 还可以检查一个字符串是否是另一个字符串的子字符串', () => {
    let str = "abcdef"
    expect(str).toContain('a')
    expect(str).toContain('de')
    expect(str).not.toContain('q')
  });

  it('18,toContainEqual 断言是否包含具有特定结构和值的项在数组中。它在每个元素内部像 toEqual 一样工作', () => {
    expect([{a: 1}, {v: 2}]).toContainEqual({a: 1})

    // 属性为undefined的值会跳过
    expect([{a: 1}, {a: 2, b: undefined}]).toContainEqual({a: 2})
  });

  it('19，toHaveLength 断言对象是否具有 .length 属性，并且该属性设置为特定的数字值。', () => {
    expect('abc').toHaveLength(3)
    expect([1, 2, 3]).toHaveLength(3)

    expect('').not.toHaveLength(3) // doesn't have .length of 3
    expect({length: 3}).toHaveLength(3)
  });


  const invoice = {
    'isActive': true,
    'P.O': '12345',
    'customer': {
      first_name: 'John',
      last_name: 'Doe',
      location: 'China',
    },
    'total_amount': 5000,
    'items': [
      {
        type: 'apples',
        quantity: 10,
      },
      {
        type: 'oranges',
        quantity: 5,
      },
    ],
    num: 100
  }
  // 你可以提供一个可选的值参数，也称为深度相等性，例如 toEqual 匹配器，以比较接收到的属性值。
  it('20,toHaveProperty 断言对象是否存在提供的引用 key 的属性', () => {
    expect(invoice).toHaveProperty('items')
    expect(invoice).toHaveProperty('num')

    // 指定属性的值，对象和数组都支持获取
    expect(invoice).toHaveProperty('num', 100)
    expect(invoice).toHaveProperty(['num'], 100) // 深度路径值获取比较

    // 获取指定路径的属性值比较
    expect(invoice).toHaveProperty('items.0.type', 'apples')
    expect(invoice).toHaveProperty(['items',0,'type'], 'apples')
  });
})
