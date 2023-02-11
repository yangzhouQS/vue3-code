import {defineComponent} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {usePosition} from "@/components/vue/hooks/usePosition";
import {Layout} from "@/components/vue";

export const StudioPanelInternal = defineComponent({
  name: 'StudioPanelInternal',
  inheritAttrs: false,
  setup(_, {slots}) {
    const prefix = usePrefix('main-panel')
    const position = usePosition()
    const classNameBase = `root ${position}`

    return () => {
      return <div class={`${prefix}-container ${classNameBase}`}>
        <div class={`${prefix}-header`}>
          <div class={`${prefix}-header-logo`}>logo</div>
          <div class={`${prefix}-header-actions`}>actions</div>
        </div>
        <div class={prefix}>
          {slots.default?.()}
        </div>
      </div>
    }
  }
})

export const StudioPanel = defineComponent({
  name: 'StudioPanel',
  setup(_, {slots}) {
    return () => {
      return <Layout>
        <StudioPanelInternal>
          {slots.default?.()}
        </StudioPanelInternal>
      </Layout>
    }
  }
})
