import {defineComponent, Fragment} from 'vue'

export const Workspace = defineComponent({
  name: "workspace",
  inheritAttrs: false,
  props: {},
  setup(_, {slots}) {
    return () => {
      return <Fragment>{slots.default?.()}</Fragment>
    }
  }
})
