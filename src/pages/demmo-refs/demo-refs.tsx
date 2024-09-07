import {defineComponent, onMounted, ref} from "vue"
import {VInput} from "@/pages/demmo-refs/v-input";

export const DemoRefs = defineComponent({
  name: 'DemoRefs',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const inputRef = ref()
    onMounted(() => {
      console.log(inputRef)
      console.log(VInput)
      debugger
    })
    return () => {
      return <div>
        <VInput ref={inputRef}/>
      </div>
    }
  }
})
