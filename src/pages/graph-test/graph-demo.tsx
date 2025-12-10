import {defineComponent, onMounted, ref} from "vue"
import {tableConfig} from "./table-config"
import {useGraph} from "./useGraph";
import assemData from "./assem-data.json";
import {getNodePath} from "./utils/core/getNodePath";
import {getParentsForNodeId} from "./utils/graph/graphHelpers";

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
    // const graph = useGraph.setGraph(JSON.stringify(tableConfig))
    const graph = useGraph.setGraph(JSON.stringify(assemData))
    // const graph = useGraph.setGraph(JSON.stringify(tableData))

    // console.log(useGraph);

    onMounted(() => {

    })

    const onClick = () => {
      const {nodes, edges} = useGraph
      console.log('onClick', useGraph);
      console.log(nodes);
      console.log(edges);
      const nodePath = getNodePath(nodes, edges, '10')
      console.log(`节点id对应路径: ${nodePath}`);
      const pNode = getParentsForNodeId(nodes, edges, '10')
      console.log('pNode: ', pNode);
      debugger;
    }
    return () => {
      return (
        <div class={'full-container'}>
          <el-button
            type="primary"
            onClick={onClick}
          >
            测试
          </el-button>
        </div>
      )
    }
  }
})
