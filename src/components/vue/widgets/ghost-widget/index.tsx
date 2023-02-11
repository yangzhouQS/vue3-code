import {defineComponent, Fragment} from 'vue'
import {useDesigner} from "@/components/vue/hooks/useDesigner";
import {useCursor} from "@/components/vue/hooks/useCursor";
import {CursorStatus} from "@/components/core";

export const GhostWidget = defineComponent({
  name: 'GhostWidget',
  props: {
    theme: {
      type: String,
      default: 'light'
    }
  },
  setup(props, {slots}) {
    const designer = useDesigner()
    const cursor = useCursor()
    const className = 'dn-ghost'

    const draggingNodes = designer.findDraggingNodes()
    const firstNode = draggingNodes[0]

    const refGhost = (dom: HTMLElement | null) => {
      if (dom) {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX - 18
        }px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`
        dom.style.transform = transform
      }
    }
    const renderNodes = (
      <span style={{
        whiteSpace: 'nowrap'
      }}>
          hello message
        {draggingNodes.length > 1 ? "..." : ""}
        </span>
    )


    return () => {
      return <div> host = {props.theme}xxx</div>

      if (!firstNode) {
        return null
      }
      if (cursor.status === CursorStatus.Dragging) {
        return <div className={className} ref={refGhost}>{renderNodes}</div>
      }
      return null
    }
  }
})
