import {defineComponent, Fragment} from 'vue'
import {useDesigner} from "@/components/vue/hooks/useDesigner";
import {useCursor} from "@/components/vue/hooks/useCursor";
import {CursorStatus} from "@/components/core";

export const GhostWidget = defineComponent({
  name: 'GhostWidget',
  setup(propsprops, {slots}) {
    const designer = useDesigner()
    const cursor = useCursor()
    const className = 'dn-ghost'

    const draggingNodes = designer.findDraggingNodes()
    const firstNode = draggingNodes[0]

    const refGhost = (dom: HTMLElement | null) => {
      if (dom) {

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
    if (!firstNode) {
      return null
    }

    return () => {
      return <div>xxx</div>
      /*return cursor.status === CursorStatus.Dragging ? (
        <div class={className} ref={refGhost}>{renderNodes}</div>
      ) : ''*/
    }
  }
})
