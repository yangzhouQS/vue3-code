import {observer} from '@formily/reactive-vue'
import {observable} from '@formily/reactive'

export const modelObj = observable<any>({
  age: 30,
  get sub10() {
    return modelObj.age - 10
  },
  get sub20() {
    return modelObj.sub10 - 10
  },
  setAge() {
    modelObj.age++
  },
})
