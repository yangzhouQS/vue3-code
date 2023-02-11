import {
  defineComponent, defineProps, onMounted, ref,
  PropType, watchEffect, onUnmounted,
  effect
} from 'vue'
import {Engine} from "@/components/core";
import {each as $each} from 'lodash'
import {Layout} from "./layout";
import {GhostWidget} from "../widgets/ghost-widget";
import {useGlobalContext} from "@/components/vue";
import ProvideGlobalSettings from '@/components/vue/hooks/provide-global-settings'
import {useLayoutContext} from "@/components/vue/hooks/LayoutContext";

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
    const {setEngine} = useGlobalContext()
    setEngine(props.engine)
    const counter = ref(10)

    const layout = useLayoutContext()

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
      const className = [
        "designer-container full-container",
        `${props.prefixCls}app`,
        {
          [`${props.prefixCls}${props.theme}`]: props.theme
        }
      ]
      /*return <ProvideGlobalSettings>
        <Layout
          theme={props.theme}
          prefixCls={props.prefixCls}
          position={props.position}
          ref={layoutRef}
          class={className}
        >
          {slots.default?.()}
          <GhostWidget/>
        </Layout>
      </ProvideGlobalSettings>*/
      const theme2 = ref('light')
      const onClick = () => {
        console.log(`toggle:`, theme2.value)
        theme2.value = theme2.value === 'dark' ? 'light' : 'dark'
        console.log('toggle theme end:', theme2.value)

        layout.setTheme(theme2.value)
        layout.setPosition('absolute')
        console.log(layout)
      }
      return <Layout
        theme={props.theme}
        prefixCls={props.prefixCls}
        position={props.position}
        ref={layoutRef}
        class={className}
      >
        <p>layout.layoutState {layout.layoutState.position}</p>
        <p>layout.layoutState {layout.layoutState.theme}</p>
        <p>designer theme = {theme2.value}</p>
        <button onClick={onClick}>切换</button>
        {slots.default?.()}
        <GhostWidget theme={theme2.value}/>
      </Layout>
    }
  }
})
