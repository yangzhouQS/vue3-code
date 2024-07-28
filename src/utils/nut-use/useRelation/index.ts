export * from './useChildren'
export * from './useParent'

/*
* 在父组件中使用 useChildren 关联子组件:
import { ref } from 'vue';
import { useChildren } from '';

const RELATION_KEY = Symbol('my-relation');

export default {
  setup() {
    const { linkChildren } = useChildren(RELATION_KEY);

    const count = ref(0);
    const add = () => {
      count.value++;
    };

    // 向子组件提供数据和方法
    linkChildren({ add, count });
  },
};

*
* */

/*
* 在子组件中使用 useParent 获取父组件提供的数据和方法:

import { useParent } from '';

export default {
  setup() {
    const { parent } = useParent(RELATION_KEY);

    // 调用父组件提供的数据和方法
    if (parent) {
      parent.add();
      console.log(parent.count.value); // -> 1
    }
  },
};

*
* */
