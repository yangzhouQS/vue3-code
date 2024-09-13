import {defineComponent} from 'vue';
import {forwardRef} from "@/pages/hoc/forward-ref";

export const Wrapper = defineComponent({
  name: 'Wrapper',
  setup(props) {
    return () => {
      return forwardRef('div')
    }
  }
})
