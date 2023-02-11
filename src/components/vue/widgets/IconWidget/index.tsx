import {defineComponent, h} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {useRegistry} from "@/components/vue/hooks/useRegistry";
import {isStr} from "@/components/shared";

const isNumSize = (val: any) => /^[\d.]+$/.test(val)
export const IconWidget = defineComponent({
  name: 'IconWidget',
  props: {
    tooltip: Boolean, // 是否展示tooltip
    content: [Object, String], // 渲染内容
    infer: [String], // infer
    width: [Number, String],
    height: [Number, String],
    style: Object,
    onClick: Function,
    size: {
      type: [Number, String],
      default: '1em'
    }, // 大小
  },
  setup(props, {slots}) {
    const prefix = usePrefix('icon')
    const registry = useRegistry()
    const size = props.size || '1em'
    const height = props.height || size
    const width = props.width || size

    const takeIcon = (infer)=>{
      if (isStr(infer)){

      }
    }
    return () => {
      return <span
        class={[`${prefix}`]}
        style={{
          ...props.style,
          cursor: props.onClick ? 'pointer' : props.style?.cursor
        }}
      >
        {h(props.infer)}
      </span>
    }
  }
})
