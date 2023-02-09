import {defineComponent} from 'vue'

export const Workbench = defineComponent({
  name: "workbench",
  props: {},
  setup() {
    return () => {
      return <div>workbench</div>
    }
  }
})
