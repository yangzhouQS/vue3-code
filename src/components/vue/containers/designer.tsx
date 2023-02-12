import {
  defineComponent, defineProps, onMounted, ref,
  PropType, watchEffect, onUnmounted,
  effect,
  provide
} from 'vue'
import {Engine, GlobalRegistry} from "@/components/core";
import {Layout} from "./layout";
import {GhostWidget} from "../widgets/ghost-widget";
import * as Icons from "../icons"

GlobalRegistry.registerDesignerIcons(Icons)
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
    provide('variables', props.variables)
    provide('prefixCls', props.prefixCls)
    provide('theme', props.theme)
    provide('position', props.position)
    provide('engine', props.engine)

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

    effect(() => {
    })

    return () => {
      return <Layout isDesigner={true}>
        {slots.default?.()}
        <GhostWidget/>
      </Layout>
    }
  }
})
