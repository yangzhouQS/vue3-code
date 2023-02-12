import {defineComponent, effect, PropType, ComponentPublicInstance, ref} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {useWorkbench} from "@/components/vue/hooks/useWorkbench";
import {IconWidget} from "@/components/vue/widgets/IconWidget";
import {TextWidget} from "@/components/vue";

export const SettingsPanel = defineComponent({
  name: 'SettingsPanel',
  props: {
    title: {
      type: String,
    },
    extra: {
      type: Object as PropType<ComponentPublicInstance>,
    },
  },
  setup(props, {slots}) {
    const prefix = usePrefix('settings-panel')
    const workbench = useWorkbench()
    const innerVisible = ref(true)
    const pinning = ref(false)
    const visible = ref(true)
    const setPinning = (val: boolean) => {
      pinning.value = val
    }
    const setVisible = (val: boolean) => {
      console.log('setVisible', val)
      visible.value = val
    }
    const setInnerVisible = (val: boolean) => {
      visible.value = val
    }
    effect(() => {
      if (visible.value || workbench.type === 'DESIGNABLE') {
        if (!innerVisible.value) {
          requestAnimationFrame(() => {
            setInnerVisible(true)
          })
        }
      }
    })
    if (workbench.type !== 'DESIGNABLE') {
      if (innerVisible.value) setInnerVisible(false)
      return null
    }

    if (!visible.value) {
      if (innerVisible.value) setInnerVisible(false)
      return (
        <div
          class={prefix + '-opener'}
          onClick={() => {
            setVisible(true)
          }}
        >
          <IconWidget infer="Setting" size={20}/>
        </div>
      )
    }

    return () => {
      return <div class={[prefix, {pinning: pinning.value}]}>
        <div class={prefix + '-header'}>
          <div class={prefix + '-header-title'}>
            <TextWidget>{props.title}</TextWidget>
          </div>
          <div class={prefix + '-header-actions'}>
            <div class={prefix + '-header-extra'}>{props.extra}</div>
            {!pinning.value && (
              <IconWidget
                infer="PushPinOutlined"
                class={prefix + '-header-pin'}
                onClick={() => {
                  setPinning(!pinning.value)
                }}
              />
            )}
            {pinning.value && (
              <IconWidget
                infer="PushPinFilled"
                class={prefix + '-pin-filled'}
                onClick={() => {
                  setPinning(!pinning.value)
                }}
              />
            )}
            <IconWidget
              infer="Close"
              class={prefix + '-header-close'}
              onClick={() => {
                setVisible(false)
              }}
            />
          </div>
        </div>
        <div class={prefix + '-body'}>
          {innerVisible.value && slots.default?.()}
        </div>
      </div>
    }
  }
})
