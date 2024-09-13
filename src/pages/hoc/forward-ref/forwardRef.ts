import { h, VNode } from 'vue'
import { ComponentType } from './types'
import { compatGetCurrentInstance, setRef, waitParentRefSetting } from './utils'

/**
 * Make inner component inherits the parent's ref owner
 */
export function forwardRef(component: ComponentType, instance = compatGetCurrentInstance()) {
  if (!instance) {
    throw new Error(`forwardRef is used without current active component instance.`)
  }

  return createInnerComponent(component, instance)
}

function createInnerComponent(component: ComponentType, instance: any) {
  if (component === undefined || component === null) {
    return
  }

  let oldRawRef: any = null

  const overrideRef = (refValue: any) => {
    debugger;
    const parent = instance.parent
    const rawRef = instance.vnode.ref
    waitParentRefSetting().then(() => {
      if (rawRef != null) {
        setRef(
          rawRef,
          oldRawRef,
          refValue,
          parent,
          instance.isUnmounted
        )

        oldRawRef = rawRef
      }
    })
  }

  return h(component as any, {
    ref: overrideRef
  })
}
