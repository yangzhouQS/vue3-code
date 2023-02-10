import {defineComponent} from 'vue'

export const GhostWidget = defineComponent({
  name: 'GhostWidget',
  props: {},
  setup(propsprops, {slots}) {
    return () => {
      return <div>GhostWidget</div>
    }
  }
})
