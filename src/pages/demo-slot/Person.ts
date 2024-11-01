import {observable, define, action} from '@formily/reactive'
import {uid} from "./uid";

export class TreeNode {
  id: string
  nodeName: string

  constructor(name: string) {
    this.id = uid()
    this.nodeName = name
  }
}

export class Person {
  id = uid(8);
  name = "Tom"
  cursor: any
  flag: boolean
  dropNode: TreeNode
  closestNode: TreeNode = null
  dragNodes: TreeNode[] = []


  // -----------
  deep = {aa: 1}
  shallow = {}
  box = 0
  ref = ''

  // -----------


  constructor() {
    console.log('Person constructor:')
    this.makeObservable()
  }

  makeObservable() {
    define(this, {
      dragNodes: observable, // observable.shallow,
      closestNode: observable.ref,
      setDropNode: action,
      setFlag: action,

      deep: observable,
      shallow: observable.shallow,
      box: observable.box,
      ref: observable.ref,
      computed: observable.computed,
      action,
    })
  }

  get computed() {
    return this.deep.aa + this.box.get() + ' --- ' + this.dropNode?.id
  }

  action(aa, box) {
    this.deep.aa = aa
    this.box.set(box)
  }

  setBox() {
    // this.box = this.box.get() + 10
    this.box.set(this.box.get() + 10)
    const val = this.box.get()
    console.log('Person val box : ', val)
  }

  setDropNode(node: TreeNode) {
    this.dropNode = node
  }

  setFlag(status: boolean) {
    this.flag = !!status
  }
}

// export default observable(new Person())
export default new Person()
