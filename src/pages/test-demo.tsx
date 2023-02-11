import {defineComponent, effect} from 'vue'

export default defineComponent({
  props: {
    theme: {
      type: String
    }
  },
  setup(props) {
    effect(() => {
      console.log(props.theme)
    })
    return () => {
      return (
        <div>
          test - demo {props.theme}
        </div>
      )
    }
  }
})
