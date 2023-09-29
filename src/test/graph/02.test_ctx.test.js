import {it, describe, expect, beforeEach} from "vitest";

describe("测试上下文操作", () => {
  it('ctx', (ctx) => {
    // console.log(ctx.task);
  });

  it('内置测试上下文', ({expect}) => {
    expect(2 + 2).toBe(4)
  });


  // 此 API 对于同时运行快照测试非常有用，因为全局 Expect 无法跟踪它们:
  it.concurrent('math is easy', ({expect}) => {
    expect(2 + 2).toMatchInlineSnapshot('4')
  })

  it.concurrent('math is hard', ({expect}) => {
    expect(2 * 2).toMatchInlineSnapshot('4')
  })

  // 跳过当前测试，标记为已通过
  it.skip('math is hard', ({skip}) => {
    // skip()
    expect(2 + 2).toBe(5)
  })

})


describe("测试上下文的扩展", () => {
  beforeEach((context) => {
    context.foo = "hello"
  })

  it('上下文添加属性', ({foo}) => {
    console.log(foo);
    expect(foo).toBe("hello")
  });
})
