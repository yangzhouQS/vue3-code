import {defineComponent} from 'vue'
import {WorkbenchTypes} from "../../../core";
import {IconWidget} from "../IconWidget";
import {useWorkbench} from "../../hooks/useWorkbench";
import {usePrefix} from "../../hooks/usePrefix";

export interface IViewToolsWidget {
  use?: WorkbenchTypes[]
  style?: any
  class?: string
}

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

