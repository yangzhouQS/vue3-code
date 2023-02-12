import {defineComponent} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import "./styles.less"

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
