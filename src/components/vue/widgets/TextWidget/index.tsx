import {defineComponent, Fragment} from 'vue'
import {isPlainObj, isStr} from "@/components/shared";

export const TextWidget = defineComponent({
  name: 'TextWidget',
  props: {
    componentName: String,
    sourceName: String,
    token: String,
    message: String,
  },
  setup(props, {slots}) {
    return () => {

      if (props.message) {
        // 字符串
        if (isStr(props.message)) {
          return props.message
        }

        // 复杂对象配置
        if (isPlainObj(props.message)) {
          debugger
          return props.message
        }

        return props.message
      } else {
        return <Fragment>{slots.default?.()}</Fragment>
      }

    }
  }
})
