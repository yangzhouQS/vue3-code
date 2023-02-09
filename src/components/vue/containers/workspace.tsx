import {defineComponent} from 'vue'

export const Workspace = defineComponent({
  name: "workspace",
  props: {},
  setup() {
    return () => {
      return <div>workspace</div>
    }
  }
})
