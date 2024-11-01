import {defineComponent, PropType, toRefs} from 'vue';
import {DefaultsOptions, provideDefaults} from "../../composables/default";

/**
 * v-defaults-provider组件用于向其范围内的组件提供默认属性。
 * 它与全局配置挂钩特性，并且可以轻松地一次分配多个属性，或者将所有传入的更改范围划分给任何子项。
 */
export const VDefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',
  props:{
    defaults: Object as PropType<DefaultsOptions>,
    disabled: Boolean,
    reset: [Number, String],
    root: [Boolean, String],
    scoped: Boolean,
  },
  setup(props, { slots }) {
    const {
      defaults,
      disabled,
      reset,
      root,
      scoped
    } = toRefs(props)


    provideDefaults(defaults, {
      reset,
      root,
      scoped,
      disabled,
    })

    return () => slots.default?.()
  }
})

