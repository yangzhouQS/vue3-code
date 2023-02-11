import {defineComponent} from 'vue'
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

      // 字符串
      if (isStr(props.message)){
        return props.message
      }

      // 复杂对象配置
      if (isPlainObj(props.message)){
        debugger
        return props.message
      }

      return props.message
    }
  }
})
