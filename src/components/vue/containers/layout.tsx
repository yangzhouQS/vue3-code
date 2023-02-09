import {defineComponent} from 'vue'

export const Layout = defineComponent({
  name: "designer",
  props: {},
  setup() {
    return () => {
      return <div>layout</div>
    }
  }
})
