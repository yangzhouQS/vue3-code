import {defineComponent, effect} from 'vue'

export const MonacoEditor = defineComponent({
  name: 'MonacoEditor',
  props: {
  },
  setup(props) {
    return () => {
      return (
        <div>
          monaco-editor
        </div>
      )
    }
  }
})
