import {defineComponent, onMounted, ref} from "vue"
import {tableConfig} from "./table-config"
import {useGraph} from "./useGraph";

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

    // console.log(tableData);
    // debugger;
    // const graph = useGraph.setGraph(JSON.stringify(sampleJson))
    // const graph = useGraph.setGraph(JSON.stringify(assemData))
    const graph = useGraph.setGraph(JSON.stringify(tableConfig))
    // const graph = useGraph.setGraph(JSON.stringify(tableData))
    console.log(graph);
    // console.log(useGraph);

    onMounted(() => {

    })

    const onClick = () => {
      console.log('onClick');
    }
    return () => {
      return (
        <div class={'full-container'}>
          xxx
          <el-button type="primary"

                     onClick={onClick}
          >测试</el-button>
        </div>
      )
    }
  }
})
