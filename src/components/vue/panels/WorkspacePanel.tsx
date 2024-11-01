import {defineComponent} from 'vue'
import {usePrefix} from "../hooks/usePrefix";

export const WorkspacePanel = defineComponent({
  name: 'WorkspacePanel',

  setup(props, {slots}) {
    const prefix = usePrefix('workspace-panel')
    return () => {
      return <div class={prefix}>{slots.default?.()}</div>
    }
  }
})


export const WorkspacePanelItem = defineComponent({
  name: 'WorkspacePanelItem',
  props: {
    flexable: Boolean
  },
  setup(props, {slots}) {
    const prefix = usePrefix('workspace-panel-item')
    return () => {
      return <div
        class={prefix}
        style={{
          flexGrow: props.flexable ? 1 : 0,
          flexShrink: props.flexable ? 1 : 0,
        }}
      >{slots.default?.()}</div>
    }
  }
})

