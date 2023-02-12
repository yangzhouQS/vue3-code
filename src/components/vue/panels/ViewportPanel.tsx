import {defineComponent} from 'vue'
import {Simulator, WorkspacePanelItem} from "@/components/vue";

export const ViewportPanel = defineComponent({
  name: 'ViewportPanel',
  setup(props, {slots}) {
    return () => {
      return <WorkspacePanelItem flexable>
        <Simulator>
          {slots.default?.()}
        </Simulator>
      </WorkspacePanelItem>
    }
  }
})
