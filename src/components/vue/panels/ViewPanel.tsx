import {defineComponent, ref, Fragment} from 'vue'
import {useWorkbench} from "../hooks/useWorkbench";
import {Viewport} from "../containers";
import {useTree} from "../hooks/useTree";


export type WorkbenchTypes =
  | 'DESIGNABLE'
  | 'PREVIEW'
  | 'JSONTREE'
  | 'MARKUP'
  | (string & {})


export const ViewPanel = defineComponent({
  name: 'ViewPanel',
  inheritAttrs: false,
  props: {
    scrollable: {
      type: Boolean,
      default: true,
    },
    children: {
      type: Array,
      default: true,
    },
    type: { // WorkbenchTypes
      type: String,
      default: () => {
        return ''
      },
    },
    dragTipsDirection: { // 'left' | 'right'
      type: String,
      default: true,
    },
  },
  setup(props, {slots}) {
    const visible = ref(true)
    const workbench = useWorkbench()
    const tree = useTree()
    const setVisible = (val: boolean) => {
      visible.value = val
    }

    const render = () => {
      console.log(props)
      console.log(slots)
      return <Fragment>{slots.default?.()}</Fragment>
    }

    if (workbench.type === 'DESIGNABLE') {
      return (
        <Viewport dragTipsDirection={props.dragTipsDirection}>
          {render()}
        </Viewport>
      )
    }

    return () => {
      return <div
        style={{
          overflow: props.scrollable ? 'overlay' : 'hidden',
          height: '100%',
          cursor: 'auto',
          userSelect: 'text',
        }}
      >
        {render()}
      </div>
    }
  }
})
