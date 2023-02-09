import {defineComponent, defineProps, onMounted, ref, PropType, watchEffect, onUnmounted} from 'vue'
import {Engine} from "@/components/core";
import {each as $each} from 'lodash'
import {Layout} from "./layout";


// https://markus.oberlehner.net/blog/context-and-provider-pattern-with-the-vue-3-composition-api/
// 组件属性注入技术
export const Designer = defineComponent({
  name: "designer",
  props: {
    variables: {
      type: Object,
      default: () => {
        return {}
      }
    },
    prefixCls: {
      type: String,
      default: () => {
        return 'dn-'
      }
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
  setup(props, {slots}) {
    const counter = ref(10)

    onMounted(() => {
      console.log('onMounted')
      if (props.engine) {
        props.engine.mount()
      }
    })
    onUnmounted(() => {
      if (props.engine) {
        props.engine.unmount()
      }
      console.log('onMounted')
    })
    watchEffect(() => {
      console.log('watchEffect')
    })

    const layoutRef = (dom: HTMLElement | null) => {
      if (dom) {
        $each(props.variables, (value: any, key: string) => {
          dom.style.setProperty(`--${key}`, value)
        })
      }
    }
    return () => {
      const classNme = [
        "designer--xxx",
        `${props.prefixCls}app`,
        {
          [`${props.prefixCls}${props.theme}`]: props.theme
        }
      ]
      return <Layout {...props} ref={layoutRef} class={classNme}>
        {slots.default?.()}
      </Layout>
    }
  }
})
