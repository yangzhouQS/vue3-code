import {defineComponent, ref} from 'vue'
import {useWorkbench} from "@/components/vue/hooks/useWorkbench";
import {useTree} from "@/components/vue/hooks/useTree";
import {Viewport} from "@/components/vue";

export const ViewPanel = defineComponent({
  name: 'ViewPanel',
  props: {
    scrollable: {
      type: Boolean,
      default: true,
    },
    children: {
      type: Array,
      default: true,
    },
    type: {
      type: Boolean,
      default: true,
    },
    dragTipsDirection: { // 'left' | 'right'
      type: String,
      default: true,
    },
  },
  setup(props) {
    const visible = ref(true)
    const workbench = useWorkbench()
    const tree = useTree()
    const setVisible = (val: boolean) => {
      visible.value = val
    }

    const render = () => {

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
