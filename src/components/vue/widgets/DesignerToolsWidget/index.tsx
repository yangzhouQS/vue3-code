import './styles.less'

type DesignerToolsType = 'HISTORY' | 'CURSOR' | 'SCREEN_TYPE'

export type IDesignerToolsWidgetProps = {
  class?: string
  style?: any
  use?: DesignerToolsType[]
}
import {defineComponent, reactive, Fragment} from 'vue'
import {useScreen} from "../../hooks/useScreen";
import {useCursor} from "../../hooks/useCursor";
import {useWorkbench} from "../../hooks/useWorkbench";
import {useHistory} from "../../hooks/useHistory";
import {IconWidget} from "../IconWidget";
import {usePrefix} from "../../hooks/usePrefix";
import {CursorType, ScreenType} from "../../../core";

export const DesignerToolsWidget = defineComponent({
  name: 'DesignerToolsWidget',
  props: {
    use: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, {slots}) {
    return () => {
      const screen = useScreen()
      const cursor = useCursor()
      const workbench = useWorkbench()
      const history = useHistory()
      const sizeRef = reactive<{ width?: any; height?: any }>({})
      const prefix = usePrefix('designer-tools')
      const renderHistoryController = () => {
        if (!props.use.includes('HISTORY')) return null
        return (
          <el-button-group size="small" style={{marginRight: 20}}>
            <el-button
              size="small"
              disabled={!history?.allowUndo}
              onClick={() => {
                history.undo()
              }}
            >
              <IconWidget infer="Undo"/>
            </el-button>
            <el-button
              size="small"
              disabled={!history?.allowRedo}
              onClick={() => {
                history.redo()
              }}
            >
              <IconWidget infer="Redo"/>
            </el-button>
          </el-button-group>
        )
      }

      const renderCursorController = () => {
        if (workbench.type !== 'DESIGNABLE') return null
        if (!props.use.includes('CURSOR')) return null
        return (
          <el-button-group size="small" style={{marginRight: 20}}>
            <el-button
              size="small"
              disabled={cursor.type === CursorType.Move}
              onClick={() => {
                cursor.setType(CursorType.Move)
              }}
            >
              <IconWidget infer="Move"/>
            </el-button>
            <el-button
              size="small"
              disabled={cursor.type === CursorType.Selection}
              onClick={() => {
                cursor.setType(CursorType.Selection)
              }}
            >
              <IconWidget infer="Selection"/>
            </el-button>
          </el-button-group>
        )
      }

      const renderResponsiveController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        if (screen.type !== ScreenType.Responsive) return null
        return (
          <Fragment>
            <el-input-number
              size="small"
              value={screen.width}
              style={{width: 70, textAlign: 'center'}}
              onChange={(value) => {
                sizeRef.value.width = value
              }}
              onPressEnter={() => {
                screen.setSize(sizeRef.value.width, screen.height)
              }}
            />
            <IconWidget
              size={10}
              infer="Close"
              style={{padding: '0 3px', color: '#999'}}
            />
            <el-input-number
              value={screen.height}
              size="small"
              style={{
                width: 70,
                textAlign: 'center',
                marginRight: 10,
              }}
              onChange={(value) => {
                sizeRef.value.height = value
              }}
              onPressEnter={() => {
                screen.setSize(screen.width, sizeRef.value.height)
              }}
            />
            {(screen.width !== '100%' || screen.height !== '100%') && (
              <el-button
                size="small"
                style={{marginRight: 20}}
                onClick={() => {
                  screen.resetSize()
                }}
              >
                <IconWidget infer="Recover"/>
              </el-button>
            )}
          </Fragment>
        )
      }

      const renderScreenTypeController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        return (
          <el-button-group size="small" style={{marginRight: 20}}>
            <el-button
              size="small"
              disabled={screen.type === ScreenType.PC}
              onClick={() => {
                screen.setType(ScreenType.PC)
              }}
            >
              <IconWidget infer="PC"/>
            </el-button>
            <el-button
              size="small"
              disabled={screen.type === ScreenType.Mobile}
              onClick={() => {
                screen.setType(ScreenType.Mobile)
              }}
            >
              <IconWidget infer="Mobile"/>
            </el-button>
            <el-button
              size="small"
              disabled={screen.type === ScreenType.Responsive}
              onClick={() => {
                screen.setType(ScreenType.Responsive)
              }}
            >
              <IconWidget infer="Responsive"/>
            </el-button>
          </el-button-group>
        )
      }

      const renderMobileController = () => {
        if (!props.use.includes('SCREEN_TYPE')) return null
        if (screen.type !== ScreenType.Mobile) return
        return (
          <el-button
            size="small"
            style={{marginRight: 20}}
            onClick={() => {
              screen.setFlip(!screen.flip)
            }}
          >
            <IconWidget
              infer="Flip"
              style={{
                transition: 'all .15s ease-in',
                transform: screen.flip ? 'rotate(-90deg)' : '',
              }}
            />
          </el-button>
        )
      }

      return (
        <div class={prefix}>
          {renderHistoryController()}
          {renderCursorController()}
          {renderScreenTypeController()}
          {renderMobileController()}
          {renderResponsiveController()}
        </div>
      )
    }
  }
})

