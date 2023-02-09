import {defineComponent} from 'vue'

export const Layout = defineComponent({
  name: "designer",
  props: {
    theme: {
      type: String,
      default: () => {
        return 'light'
      }
    },
    prefixCls: {
      type: String,
      default: () => {
        return 'dn-'
      }
    },
    position: {
      type: String,
      default: () => {
        return 'fixed'
      }
    },
  },
  setup(props, {slots}) {
    return () => {
      return <div>
        layout
        {slots.default?.()}
      </div>
    }
  }
})
