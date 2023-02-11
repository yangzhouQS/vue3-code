import {defineComponent, effect, watch} from 'vue'
import {useLayoutContext} from "@/components/vue/hooks/LayoutContext";

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
    const layout = useLayoutContext()
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
        <p>layout = {layout.layoutState.theme}</p>
        {slots.default?.()}
      </div>
    }
  }
})
