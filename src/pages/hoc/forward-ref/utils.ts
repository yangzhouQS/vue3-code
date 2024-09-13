import {EMPTY_OBJ, hasOwn, isArray, isFunction, isString, remove} from '@vue/shared'
import {getCurrentInstance, isRef, nextTick, version} from 'vue'

export function compatGetCurrentInstance(): any {
  return getCurrentInstance()
}

export function waitParentRefSetting() {
  return new Promise<void>((resolve) => new Promise<void>((r) => r()).then(() => nextTick(resolve)))
}

export function setRef(
  rawRef: any,
  oldRawRef: any,
  refValue: any,
  parent: any,
  isUnmount?: boolean
) {
  // Here we don't need to deal with unmounted components and runtime errors,
  // because the parent component's `setRef` will deal with it
  if (isUnmount) {
    return
  }

  if (isArray(rawRef)) {
    rawRef.forEach((r, i) =>
      setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), refValue, parent)
    )
    return
  }

  const value = isUnmount ? null : refValue

  const {i: owner, r: ref} = rawRef
  const oldRef = oldRawRef && (oldRawRef as any).r
  const refs = owner.refs === EMPTY_OBJ ? (owner.refs = {}) : owner.refs
  const setupState = owner.setupState

  // dynamic ref changed. unset old ref
  if (oldRef != null && oldRef !== ref) {
    if (isString(oldRef)) {
      refs[oldRef] = null
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null
    }
  }

  if (isFunction(ref)) {
    ref(refValue, refs)
  } else {
    const _isString = isString(ref)
    const _isRef = isRef(ref)
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString
            ? hasOwn(setupState, ref)
              ? setupState[ref]
              : refs[ref]
            : ref.value
          if (isUnmount) {
            isArray(existing) && remove(existing, refValue)
          } else {
            if (!isArray(existing)) {
              if (_isString) {
                refs[ref] = [refValue]
                if (hasOwn(setupState, ref)) {
                  setupState[ref] = refs[ref]
                }
              } else {
                ref.value = [refValue]
                if (rawRef.k) refs[rawRef.k] = ref.value
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue)
            }
          }
        } else if (_isString) {
          refs[ref] = value
          if (hasOwn(setupState, ref)) {
            setupState[ref] = value
          }
        } else if (_isRef) {
          ref.value = value
          if (rawRef.k) refs[rawRef.k] = value
        }
      }
      doSet()
    }
  }
}

export function proxy(proxy: any, target: any) {
  return new Proxy(proxy, {
    get(_target, key: string) {
      return hasOwn(target, key) ? target[key] : _target[key]
    }
  })
}
