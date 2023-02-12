import {defineComponent} from 'vue'
import {useWorkbench} from "@/components/vue/hooks/useWorkbench";
import {NodePathWidget} from "@/components/vue";
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {useOperation} from "@/components/vue/hooks/useOperation";
import {useCurrentNode} from "@/components/vue/hooks/useCurrentNode";
import {useSelected} from "@/components/vue/hooks/useSelected";

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
