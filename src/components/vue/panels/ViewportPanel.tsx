import {defineComponent} from 'vue'
import {WorkspacePanelItem} from "./WorkspacePanel";
import {Simulator} from "../containers";

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
