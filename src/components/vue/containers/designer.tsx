import {defineComponent, defineProps, withDefaults, PropType} from 'vue'
import {Engine} from "@/components/core";

export const Designer = defineComponent({
  name: "designer",
  props: {
    prefixCls: {
      type: String,
    },
    theme: {
      type: String,
      default: () => {
        return 'light'
      }
    },
    position: {
      type: String,
      default: () => {
        return 'fixed'
      }
    },
    engine: {
      type: Object as PropType<Engine>,
      required: true
    },

  },
  setup(props) {
    return () => {
      console.log(props)
      debugger
      return <div>designer</div>
    }
  }
})
