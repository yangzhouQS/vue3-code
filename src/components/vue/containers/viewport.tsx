import {defineComponent} from 'vue'

export const Viewport = defineComponent({
  name: "viewport",
  props: {},
  setup() {
    return () => {
      return <div>viewport</div>
    }
  }
})
