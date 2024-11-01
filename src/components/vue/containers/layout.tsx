import {defineComponent, effect, watch, Fragment} from 'vue'
import {each as $each} from 'lodash'
import {useDesignerLayout} from "../hooks/useDesignerLayout";

export const Layout = defineComponent({
  name: "designer",
  inheritAttrs: false,
  props: {
    isDesigner: {
      type: Boolean,
      default: false
    }
    /*  theme: {
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
      // console.log('layout: ', layout.theme)
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
      "designer-container full-container xxx",
      `${layout.prefixCls}app`,
      {
        [`${layout.prefixCls}${layout.theme}`]: layout.theme
      }
    ]
    return () => {
      // 普通容器
      if (!props.isDesigner) {
        return <Fragment >{slots.default?.()}</Fragment>
      }

      // 设计器初始化
      return <div ref={layoutRef} class={className}>
        {slots.default?.()}
      </div>
    }
  }
})
