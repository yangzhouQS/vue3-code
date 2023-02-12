import {defineComponent} from 'vue'

export const Content = defineComponent({
  name: 'Content',
  props: {},
  setup() {
    return () => {
      return <div>Content</div>
    }
  }
})
