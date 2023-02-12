import {defineComponent, h} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {useRegistry} from "@/components/vue/hooks/useRegistry";
import {isFn, isPlainObj, isStr} from "@/components/shared";
import {isVueComponent} from "@/components/shared/utils";

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
  setup(props, {slots, attrs}) {
    const prefix = usePrefix('icon')
    const registry = useRegistry()
    const size = props.size || '1em'
    const height = props.height || size
    const width = props.width || size

    const takeIcon = (infer: any) => {
      if (isStr(infer)) {
        const finded = registry.getDesignerIcon(infer)
        if (finded) {
          return takeIcon(finded)
        }
        return <img src={infer} height={height} width={width} alt=""/>
      } else if (isFn(infer)) {
        return h(infer, {attrs, style: {width, height, fill: 'currentColor',}}, slots.default?.())
      } else if (isVueComponent(infer)) {
        return h(infer, {attrs, style: {width, height, fill: 'currentColor',}}, slots.default?.())
      }
      return infer
    }
    if (!props.infer) {
      return null
    }

    return () => {
      return <span
        class={[`${prefix}`]}
        style={{
          ...props.style,
          cursor: props.onClick ? 'pointer' : props.style?.cursor
        }}
      >
        {takeIcon(props.infer)}
      </span>
    }
  }
})
