import {defineComponent} from 'vue'
import {observer} from '@formily/reactive-vue'
// 定义可观察对象
import {autorun} from '@formily/reactive'
import {modelObj as model} from "./model";
import {TreeNode, Person} from "./Person";

const person = new Person()
export const ASlotDemo = observer(defineComponent({
  name: 'ASlotDemo',
  setup(props, {slots}) {

    autorun(() => {
      // console.log('person.computed', person.computed)
      console.log('person.dropNode?.id: ', person.dropNode?.id)
    })

    const onClick = () => {
      model.setAge()
      const node = new TreeNode("AAAA")
      console.log('AAAA', node)
      person.setDropNode(node)
      person.setBox()
    }
    return () => {
      return (
        <div>
          hello
          <el-button onClick={onClick}>model age测试</el-button>
          <p>model age = {model.age}</p>
          <p>model age = {model.sub10}</p>
          <p>model age = {model.sub20}</p>
          <p>person box = {person.box.get()}</p>
        </div>
      )
    }
  }
}))
