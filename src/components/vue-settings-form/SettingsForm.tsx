import {defineComponent} from 'vue'
import {useWorkbench} from "../vue/hooks/useWorkbench";
import {NodePathWidget} from "../vue";
import {usePrefix} from "../vue/hooks/usePrefix";
import {useSelected} from "../vue/hooks/useSelected";
import {useCurrentNode} from "../vue/hooks/useCurrentNode";
import {useOperation} from "../vue/hooks/useOperation";

export const SettingsForm = defineComponent({
  name: 'SettingsForm',
  props: {
    uploadAction: {
      type: String,
    },
    components: {
      type: Object,
    },
    effects: {
      type: Function,
      default: () => {
      }
    },
    scope: {
      type: [String, Array, Object, Boolean],
    },
  },
  setup() {
    const workbench = useWorkbench()
    const currentWorkspace = workbench?.activeWorkspace || workbench?.currentWorkspace
    const currentWorkspaceId = currentWorkspace?.id
    const operation = useOperation(currentWorkspaceId)
    const node = useCurrentNode(currentWorkspaceId)
    const selected = useSelected(currentWorkspaceId)
    const prefix = usePrefix('settings-form')
    const schema = node?.designerProps?.propsSchema
    const isEmpty = !(node && node.designerProps?.propsSchema && selected.length === 1)
    const render = () => {
      return <div>render</div>
    }
    return () => {
      return <div class={prefix + '-wrapper'}>
        {isEmpty && <NodePathWidget workspaceId={currentWorkspaceId}/>}
        <div class={prefix + '-content'}>{render()}</div>
      </div>
    }
  }
})
