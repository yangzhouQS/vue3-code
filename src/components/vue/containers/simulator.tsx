import {defineComponent} from 'vue'

export  const Simulator = defineComponent({
  name: "simulator",
  props: {},
  setup() {
    return () => {
      return <div>simulator</div>
    }
  }
})
