import {defineComponent,Fragment} from 'vue'

export const Workspace = defineComponent({
  name: "workspace",
  props: {},
  setup(_, {slots}) {
    return () => {
      return <Fragment>{slots.default?.()}</Fragment>
    }
  }
})
