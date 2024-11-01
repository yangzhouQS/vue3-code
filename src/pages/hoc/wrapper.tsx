import {defineComponent} from 'vue';
import {forwardRef} from "./forward-ref";

export const Wrapper = defineComponent({
  name: 'Wrapper',
  setup(props) {
    return () => {
      return forwardRef('div')
    }
  }
})
