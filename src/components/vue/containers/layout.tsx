import {defineComponent, effect, watch, Fragment} from 'vue'
import {useDesignerLayout} from "@/components/vue/hooks/useDesignerLayout";
import {each as $each} from 'lodash'

export const Layout = defineComponent({
  name: "designer",
  inheritAttrs: false,
  props: {
    /*    theme: {
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
        },*/
  },
  setup(props, {slots}) {
    const layout = useDesignerLayout()
    effect(() => {
      console.log('layout: ', layout.theme)
    })
    watch(
      () => layout.theme,
      (val) => {
        console.log(val)
      })

    const layoutRef = (dom: HTMLElement | null) => {
      if (dom) {
        $each(layout.variables, (value: any, key: string) => {
          debugger
          dom.style.setProperty(`--${key}`, value)
        })
      }
    }
    const className = [
      "designer-container full-container",
      `${layout.prefixCls}app`,
      {
        [`${layout.prefixCls}${layout.theme}`]: layout.theme
      }
    ]
    return () => {
      if (layout) {
        return <Fragment>{slots.default?.()}</Fragment>
      }
      return <div ref={layoutRef} class={className}>
        {slots.default?.()}
      </div>
    }
  }
})
