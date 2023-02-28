import {defineComponent, ref, h} from 'vue'
import TestDemo from "@/pages/test-demo";
import {observable, action, autorun, define, model} from '@formily/reactive'
import {observer} from '@formily/reactive-vue'

const obs2 = observable({
  value: 'Hello world1243',
  aa: 11,
  bb: 22
})

export class TreeNode {
  parent: any

  root: any

  operation: any
  id: string

  depth = 0

  hidden = false

  componentName = 'NO_NAME_COMPONENT'

  sourceName = ''

  props = {}

  children: any[] = []

  isSelfSourceNode: boolean

  constructor() {
    this.makeObservable()
  }

  makeObservable() {
    define(this, {
      componentName: observable.ref,
      props: observable,
      hidden: observable.ref,
      children: observable.shallow,
      wrap: action,
      append: action,
      remove: action,
      setProps: action,
      setChildren: action,
      setComponentName: action,
    })
  }

  wrap() {
  }

  append() {
    this.children.push([1, 2, 3])
  }

  remove() {
    this.children.pop()
  }

  setProps() {
  }

  setChildren() {
    this.hidden = false
  }

  setComponentName(componentName: string) {
    this.componentName = componentName
  }
}

const Items = observer(defineComponent({
  name: 'items',
  setup() {
    const onInput = (e) => {
      obs2.aa = e.target.value
    }
    return () => {
      return (
        <div>
          <p>
            obs2.aa = {obs2.aa}
          </p>
          <input type="number" onInput={onInput}/>
        </div>
      )
    }
  }
}))

export default observer(defineComponent({
  name: 'demo-test',
  setup(props) {
    const obs = observable({
      value: 'Hello world1243',
      aa: 11,
      bb: 22
    })

    const onClick = () => {
      console.log('onClick')
      action(() => {
        obs.aa = 33
        obs.bb = 44
      })
    }
    autorun(() => {
      console.log(obs.aa, obs.bb)
    })
    return () => {
      return (
        <div class='test'>
          <Items/>
          <p>
            {obs.aa} -- {obs.bb}
          </p>
          <button onClick={onClick}>操作</button>

          <p>
            <el-tag type="success">{obs.value}</el-tag>
          </p>
        </div>
      )
    }
  }
}))
