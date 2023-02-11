import {defineComponent} from 'vue'

export const Workspace = defineComponent({
  name: "workspace",
  props: {},
  setup(_, {slots}) {
    return () => {
      return <div>{slots.default?.()}</div>
    }
  }
})
