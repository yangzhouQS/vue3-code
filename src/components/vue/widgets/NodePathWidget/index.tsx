import {defineComponent, Fragment} from 'vue'
import './style.less'

export const NodePathWidget = defineComponent({
  name: 'NodePathWidget',
  props: {
    workspaceId: String,
    maxItems: Number
  },
  setup(props, {slots}) {
    return () => {
      return <div>NodePathWidget 大纲树</div>
    }
  }
})
