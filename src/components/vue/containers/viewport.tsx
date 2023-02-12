import {defineComponent} from 'vue'

export const Viewport = defineComponent({
  name: "viewport",
  props: {
    dragTipsDirection: {// 'left' | 'right'
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup() {
    return () => {
      return <div>viewport</div>
    }
  }
})
