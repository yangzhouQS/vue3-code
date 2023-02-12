import {WorkbenchTypes} from "@/components/core";

export interface IViewToolsWidget {
  use?: WorkbenchTypes[]
  style?: any
  class?: string
}

import {defineComponent, ref, reactive} from 'vue'
import {useWorkbench} from "@/components/vue/hooks/useWorkbench";
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {IconWidget} from "@/components/vue/widgets/IconWidget";

export const ViewToolsWidget = defineComponent({
  name: 'ViewToolsWidget',
  props: {
    use: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, {slots}) {

    const workbench = useWorkbench()
    const prefix = usePrefix('view-tools')
    return () => {
      return (
        <el-button-group class={prefix}>
          {props.use.includes('DESIGNABLE') && (
            <el-button
              disabled={workbench.type === 'DESIGNABLE'}
              onClick={() => {
                workbench.type = 'DESIGNABLE'
              }}
              size="small"
            >
              <IconWidget infer="Design"/>
            </el-button>
          )}
          {props.use.includes('JSONTREE') && (
            <el-button
              disabled={workbench.type === 'JSONTREE'}
              onClick={() => {
                workbench.type = 'JSONTREE'
              }}
              size="small"
            >
              <IconWidget infer="JSON"/>
            </el-button>
          )}
          {props.use.includes('MARKUP') && (
            <el-button
              disabled={workbench.type === 'MARKUP'}
              onClick={() => {
                workbench.type = 'MARKUP'
              }}
              size="small"
            >
              <IconWidget infer="Code"/>
            </el-button>
          )}
          {props.use.includes('PREVIEW') && (
            <el-button
              disabled={workbench.type === 'PREVIEW'}
              onClick={() => {
                workbench.type = 'PREVIEW'
              }}
              size="small"
            >
              <IconWidget infer="Play"/>
            </el-button>
          )}
        </el-button-group>
      )
    }
  }
})

