import {defineComponent, onMounted, ref} from "vue"
import {useGraph} from "@/pages/graph-test/useGraph";
import {sampleJson} from "@/pages/graph-test/data";

export const GraphDemo = defineComponent({
  name: 'GraphDemo',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const menuConfig = ref([])

    // methods
    const methods = {
      loadData: () => {

      }
    }

    const graph = useGraph.setGraph(JSON.stringify(sampleJson))

    onMounted(() => {

    })

    return () => {
      return (
        <div class={'full-container'}>
          xxx
        </div>
      )
    }
  }
})
