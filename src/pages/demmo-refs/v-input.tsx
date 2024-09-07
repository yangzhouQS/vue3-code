import {defineComponent, onMounted, ref} from "vue"
import {useRender} from "@/utils/useRender";
import {forwardRefs} from "@/composables/forwardRefs";

export const VInput = defineComponent({
  name: 'v-input',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const vInputRef = ref<HTMLInputElement>(null)
    const model = ref('')

    const onFocus = () => {
      console.log('onFocus')
    }
    useRender(() => {
      return (<input
        onFocus={onFocus}
        ref={vInputRef}
        v-model={model.value}
      />)
    })

    return forwardRefs({}, vInputRef)
  }
})
