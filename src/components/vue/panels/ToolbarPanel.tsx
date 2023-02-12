import {defineComponent} from 'vue'
import {WorkspacePanelItem} from "@/components/vue";

export const ToolbarPanel = defineComponent({
  name: 'ToolbarPanel',
  props: {
    flexable: Boolean,
    style: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, {slots}) {
    return () => {
      return <WorkspacePanelItem
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 4,
          padding: '0 4px',
          ...props.style,
        }}
      >
        {slots.default?.()}
      </WorkspacePanelItem>
    }
  }
})
