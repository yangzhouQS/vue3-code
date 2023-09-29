import {it, expect} from 'vitest'
import {mount} from '@vue/test-utils'
import Hello from "./Hello.vue";
/*
*
* describe 的意思是描述一个快，你可以认为是一个测试集合
it 的意思是一个独立的测试区域，每个it应该负责单一的测试功能
expect的翻译是断言的意思，就是断言这个内容是不是符合某个值或者某些行为
toBe这里就是一个断言方式
* */

// https://blog.csdn.net/weixin_42341232/article/details/130189412
it('hello mount component', async () => {
  expect(Hello).toBeTruthy()

  const wrapper = mount(Hello, {
    props: {
      count: 4
    }
  })

  expect(wrapper.text()).toContain('4 x 2 = 8')

  // 这确保了一个值与最近的快照匹配
  expect(wrapper.html()).toMatchSnapshot()


  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toContain('4 x 3 = 12')


  await wrapper.get('button').trigger('click')
  expect(wrapper.text()).toContain('4 x 4 = 16')

  console.log(wrapper.text());
  console.log(wrapper.html());
});
