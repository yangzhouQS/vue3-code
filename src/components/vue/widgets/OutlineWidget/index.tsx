import {defineComponent, Fragment} from 'vue'

export const OutlineTreeWidget = defineComponent({
  name: 'OutlineTreeWidget',
  props: {},
  setup(props, {slots}) {
    return () => {
      return <div>OutlineTreeWidget 大纲树</div>
    }
  }
})
