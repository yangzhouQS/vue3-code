import { defineComponent, ref, onMounted } from 'vue';
import {bpmnData} from './bpmn'
import { Graph, Cell } from '@antv/x6'
import {registerNode} from "@/pages/flow/plugin";

export const FlowPage = defineComponent({
  name: 'FlowPage',
  setup(props) {
    registerNode(Graph)
    // data
    const data = ref<any>({});
    // methods
    const methods = {
      loadData: () => {
        //
      },
    };
    onMounted(() => {
      const graph = new Graph({
        container: document.getElementById('container')!,
        connecting: {
          router: 'orth',
        },
      })

      const cells: Cell[] = []
      bpmnData.forEach((item: any) => {
        if (item.shape === 'bpmn-edge') {
          cells.push(graph.createEdge(item))
        } else {
          cells.push(graph.createNode(item))
        }
      })
      graph.resetCells(cells)
      graph.zoomToFit({ padding: 10, maxScale: 1 })
    })
    return () => {
      return <div class={'full-container'}>FlowPage

        <div id="container">

        </div>
      </div>;
    };
  }
});
