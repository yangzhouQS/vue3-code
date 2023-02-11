import {defineComponent, effect, watch} from 'vue'

export const Layout = defineComponent({
  name: "designer",
  props: {
    theme: {
      type: String,
      default: 'light'
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
    effect(() => {
      console.log('layout: ', props.theme)
    })
    watch(
      () => props.theme,
      (val) => {
        console.log(val)
      })
    return () => {
      return <div>
        {slots.default?.()}
      </div>
    }
  }
})
