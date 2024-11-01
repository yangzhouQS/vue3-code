import {defineComponent} from 'vue'
import "./styles.less"
import {usePrefix} from "../../hooks/usePrefix";

export const PCSimulator = defineComponent({
  name: 'PCSimulator',
  props: {},
  setup(props, {slots}) {
    const prefix = usePrefix('pc-simulator')
    return () => {
      return <div class={prefix}>{slots.default?.()}</div>
    }
  }
})
