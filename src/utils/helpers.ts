import * as hooks from 'vue'
import {camelize, capitalize, emitter, hyphenate} from "./utils";
import type {Ref, VNode} from "vue";

const Teleport = hooks.Teleport

export type MaybeRef<T> = T | Ref<T>
export const rootConfig = (context) => {
  const instance = hooks.getCurrentInstance()
  context && setInstanceEmitter(instance)
  return instance?.appContext.config.globalProperties
}

/**
 * 获取当前组件名称
 */
export const getComponentName = () => {
  // 此处组件最多为两层组件，所以对多获取到父级组件即可
  const instance = hooks.getCurrentInstance()
  let componentName = instance?.type?.name
  if (!componentName) {
    componentName = instance?.parent?.type?.name
  }

  return componentName || ''
}

export const appContext = () =>
  hooks.getCurrentInstance()?.appContext || {
    component: () => {
      // do nothing
    },
  }


/**
 * 获取Vue全局配置
 */
export const appProperties = () => {
  const instance = hooks.getCurrentInstance()
  return instance?.appContext.config.globalProperties || {}
}

/**
 * 获取路由实例和当前路由
 * @param instance
 */
export const useRouter = (instance = hooks.getCurrentInstance()) => {
  const router = instance?.appContext.config.globalProperties.$router
  const route = router && router.currentRoute.value

  return {route, router}
}

/**
 * 在组件实例上设置$emitter事件实例
 * @param instance
 */
const setInstanceEmitter = (instance) => {
  const $emitter = emitter()

  if (typeof instance.$emitter === 'undefined')
    Object.defineProperty(instance, '$emitter', {get: () => $emitter})
}


/**
 * 事件广播
 * @param vm
 */
const emitEvent = (vm) => {
  const broadcast = (vm, componentName, eventName, params) => {
    const children = (vm.subTree && vm.subTree.children) || vm.children

    Array.isArray(children)
    && children.forEach((child) => {
      const name = child.type && child.type.componentName
      const component = child.component

      if (name === componentName) {
        component.emit(eventName, params)
        component.$emitter && component.$emitter.emit(eventName, params)
      } else {
        // 递归发射事件
        broadcast(child, componentName, eventName, params)
      }
    })
  }

  return {
    dispatch(componentName, eventName, params) {
      let parent = vm.parent || vm.root
      let name = parent.type && parent.type.componentName

      while (parent && (!name || name !== componentName)) {
        parent = parent.parent

        if (parent)
          name = parent.type && parent.type.componentName
      }

      if (parent) {
        parent.emit(...[eventName].concat(params))
        // fix: VUE3下事件参数为数组，VUE2下事件参数不是数组，这里修改为和VUE2兼容
        parent.$emitter && parent.$emitter.emit(...[eventName].concat(params))
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast(vm, componentName, eventName, params)
    },
  }
}

/**
 * 获取父组件
 * @param vm
 */
export const getRealParent = (vm) => {
  if (vm && vm.parent)
    return vm.parent.type.name === 'AsyncComponentWrapper' && vm.parent.parent ? vm.parent.parent : vm.parent
}


const parent = vm => (handler) => {
  let parent = getRealParent(vm)
  let level = 0

  const parentObject = (parent) => {
    return {
      level,
      vm: createVm({}, parent),
      el: parent.vnode.el,
      options: parent.type,
    }
  }

  if (typeof handler !== 'function')
    return parent ? parentObject(parent) : {}

  level++

  while (parent) {
    if (handler(parentObject(parent)))
      break
    parent = getRealParent(parent)
    level++
  }
}

const children = vm => (handler) => {
  if (typeof handler !== 'function')
    return generateChildren(vm.subTree)

  let layer = 1
  const broadcast = (subTree) => {
    if (subTree) {
      const children = subTree.children || subTree.dynamicChildren
      const level = layer++

      if (Array.isArray(children)) {
        if (
          children.some((child) => {
            return (
              child.component
              && handler({
                level,
                vm: createVm({}, child.component),
                el: child.el,
                options: child.type,
                isLevel1: true,
              })
            )
          })
        )
          return

        children.forEach(child => broadcast(child))
      }
    }
  }

  broadcast(vm.subTree)
}


const regEventPrefix = /^on[A-Z]/

const generateListeners = (attrs) => {
  const $attrs = {}
  const $listeners = {}

  for (const name in attrs) {
    const event = attrs[name]

    if (regEventPrefix.test(name) && typeof event === 'function') {
      $listeners[hyphenate(name.substr(2))] = event
      continue
    }

    $attrs[name] = event
  }

  return {$attrs, $listeners}
}

const generateChildren = (subTree) => {
  const children: any = []
  children.refs = {}

  if (subTree) {
    const arr = subTree.dynamicChildren || subTree.children

    if (Array.isArray(arr)) {
      arr.forEach((child) => {
        if (child.component) {
          const vm = createVm({}, child.component)

          children.push(vm)
          child.props.ref && (children.refs[child.props.ref] = vm)
        }
      })
    } else if (subTree.component) {
      children.push(createVm({}, subTree.component))
    }
  }

  return children
}

const defineProperties = (vm, instance, property, filter) => {
  for (const name in instance[property]) {
    if (typeof filter === 'function' && filter(name))
      continue

    Object.defineProperty(vm, name, {
      configurable: true,
      enumerable: true,
      get: () => instance[property][name],
      set: value => (instance[property][name] = value),
    })
  }

  return vm
}

const filter = name => name.indexOf('_') === 0

const defineInstanceVm = (vm, instance) => {
  defineProperties(vm, instance, 'setupState', null)
  defineProperties(vm, instance, 'props', filter)
  defineProperties(vm, instance, 'ctx', filter)

  return vm
}

const createVm = (vm, instance, context = null) => {
  const {$attrs, $listeners} = generateListeners(instance.attrs)
  let $emitter = instance.$emitter

  if (!$emitter) {
    setInstanceEmitter(instance)
    $emitter = instance.$emitter
  }

  const emit = (...args) => {
    instance.emit(...args)
    $emitter.emit.apply(vm, args)
  }

  const $set = (target, propertyName, value) => (target[propertyName] = value)

  context || defineInstanceVm(vm, instance)

  Object.defineProperties(vm, {
    $attrs: {get: () => $attrs},
    $children: {get: () => generateChildren(instance.subTree)},
    $constants: {get: () => instance.props._constants},
    $emit: {get: () => emit},
    $el: {get: () => instance.vnode.el},
    $listeners: {get: () => $listeners},
    $mode: {get: () => instance._tiny_mode},
    $nextTick: {get: () => hooks.nextTick},
    $off: {get: () => $emitter.off},
    $on: {get: () => $emitter.on},
    $once: {get: () => $emitter.once},
    $options: {get: () => ({componentName: instance.type.componentName})},
    $parent: {
      get: () => instance.parent && createVm({}, getRealParent(instance)),
    },
    $refs: {get: () => instance.refs},
    $renderless: {get: () => instance.props.tiny_renderless},
    $scopedSlots: {get: () => instance.slots},
    $set: {get: () => $set},
    $slots: {get: () => instance.slots},
    $template: {get: () => instance.props.tiny_template},
  })

  return vm
}

const onBeforeMount = (instance, refs) => {
  for (let name in instance.refs) {
    if (Object.prototype.hasOwnProperty.call(instance.refs, name)) {
      refs[name] = instance.refs[name]
    }
  }
}


export const tools = (context, mode) => {
  const instance = hooks.getCurrentInstance() as any
  const root = instance?.appContext.config.globalProperties
  const {route, router} = useRouter(instance)
  const i18n = instance?.proxy?.$root?.$i18n
  const {dispatch, broadcast} = emitEvent(instance)
  const parentHandler = parent(instance)
  const childrenHandler = children(instance)
  const vm = createVm({}, instance, context)
  const emit = context.emit
  const refs = {}
  const grandParent = typeof instance.props.tiny_template === 'undefined' && getRealParent(instance)
  const parentVm = grandParent ? createVm({}, grandParent) : instance.parent ? createVm({}, instance.parent) : null

  const setParentAttribute = ({name, value}) => {
    const ctx = grandParent ? grandParent.ctx : instance?.parent?.ctx
    ctx[name] = value

    // 当前的parentVm也保存一下。
    parentVm[name] = value
  }

  const defineInstanceProperties = (props) => {
    Object.defineProperties(vm, props)
    Object.defineProperties(instance?.ctx, props)
  }

  const defineParentInstanceProperties = (props) => {
    parentVm && Object.defineProperties(parentVm, props)
  }

  hooks.onBeforeMount(() => defineInstanceVm(vm, instance))
  hooks.onMounted(() => onBeforeMount(instance, refs))

  return {
    vm,
    emit,
    emitter,
    route,
    router,
    dispatch,
    broadcast,
    parentHandler,
    childrenHandler,
    i18n,
    refs,
    slots: instance?.slots,
    scopedSlots: instance?.slots,
    attrs: context.attrs,
    parent: parentVm,
    nextTick: hooks.nextTick,
    constants: instance?.props._constants,
    mode,
    isPCMode: mode === 'pc',
    isMobileMode: mode === 'mobile',
    service: root?.$service,
    getService: () => root?.$getService(vm),
    setParentAttribute,
    defineInstanceProperties,
    defineParentInstanceProperties,
  }
}

const mapping = (content, before, after) => {
  if (typeof content[before] !== 'undefined') {
    const fn = content[before]

    content[after] = (el, binding, vnode) => {
      vnode.context = binding.instance
      fn(el, binding, vnode)
    }

    delete content[before]
  }
}

export const directive = (directives) => {
  for (const name in directives) {
    const content = directives[name]

    mapping(content, 'bind', 'beforeMount')
    mapping(content, 'update', 'updated')
    mapping(content, 'unbind', 'unmounted')
  }

  return directives
}

export const parseVnode = vnode => vnode

const parseProps = (propsData) => {
  const props = {}

  for (const name in propsData) {
    if (name === 'class' || name === 'style') {
      props[name] = propsData[name]
    } else if (name === 'on' || name === 'nativeOn') {
      const events = propsData[name]

      for (const eventName in events)
        props[`on${capitalize(camelize(eventName))}`] = events[eventName]
    } else if (name === 'attrs' || name === 'props' || name === 'domProps') {
      const attrs = propsData[name]

      for (const key in attrs)
        props[key] = attrs[key]
    } else {
      props[name] = propsData[name]
    }
  }

  return props
}

const customResolveComponent = (component) => {
  let type = component
  let customElement = false

  if (typeof component === 'string' && typeof document !== 'undefined') {
    const el = document.createElement(component)
    const svgTagNames = ['SVG', 'CIRCLE', 'PATH']

    if (
      (el instanceof HTMLUnknownElement && !svgTagNames.includes(el.nodeName))
      || component.includes('-')
    ) {
      component = component.toLowerCase()
      customElement = true

      if (component === 'transition')
        type = hooks.Transition

      else if (component === 'transition-group')
        type = hooks.TransitionGroup

      else
        type = hooks.resolveComponent(component)
    } else {
      type = component
    }
  }

  return {type, component, customElement}
}

type CreateElement = (component: any, propsData?: any, childData?: any) => ReturnType<typeof hooks.h>

export const h: CreateElement = (component, propsData, childData) => {
  let props = {}
  let children = childData
  const ret = customResolveComponent(component)
  const customElement = ret.customElement
  const type = ret.type

  component = ret.component

  if (propsData && typeof propsData === 'object' && !Array.isArray(propsData)) {
    props = parseProps(propsData)
    propsData.scopedSlots && (children = propsData.scopedSlots)
  } else if (typeof propsData === 'string' || Array.isArray(propsData)) {
    childData = propsData
  }

  if (typeof childData === 'string' || Array.isArray(childData))
    children = typeof component !== 'string' || customElement ? () => childData : childData

  return hooks.h(type, props, children)
}

export const createComponentFn = (design) => {
  return ({component, propsData, el}) => {
    const comp = Object.assign(component, {provide: {[design.configKey]: design.configInstance}})
    const vnode = hooks.createVNode(comp, propsData)

    hooks.render(vnode, el)
    return createVm({}, vnode.component)
  }
}


export const defineComponent = hooks.defineComponent
export default hooks

export const isVue2 = false

export const isVue3 = true

export type {PropType, ExtractPropTypes, DefineComponent} from 'vue'


export function isObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}


export function mergeDeep(
  source: Record<string, any> = {},
  target: Record<string, any> = {},
  arrayFn?: (a: unknown[], b: unknown[]) => unknown[],
) {
  const out: Record<string, any> = {}

  for (const key in source) {
    out[key] = source[key]
  }

  for (const key in target) {
    const sourceProperty = source[key]
    const targetProperty = target[key]

    // Only continue deep merging if
    // both properties are objects
    if (
      isObject(sourceProperty) &&
      isObject(targetProperty)
    ) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn)

      continue
    }

    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty)

      continue
    }

    out[key] = targetProperty
  }

  return out
}


export function toKebabCase(str = '') {
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str)!
  const kebab = str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
  toKebabCase.cache.set(str, kebab)
  return kebab
}

toKebabCase.cache = new Map<string, string>()


export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type ScopedSlot = () => SlotReturnValue;
export type SlotReturnValue = VNode | string | boolean | null | undefined | SlotReturnArray;
export type SlotReturnArray = Array<SlotReturnValue>;
export interface TVNode extends VNode {
  name: string;
}
export type TNodeReturnValue = SlotReturnValue;

// 严格执行是否有参数，不允许出现 props?:T
export type TNode<T = undefined> = T extends undefined
  ? (h: typeof import('vue').h) => TNodeReturnValue
  : (h: typeof import('vue').h, props: T) => TNodeReturnValue;
