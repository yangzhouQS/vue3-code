import {defineComponent, ref, effect, Fragment, onMounted} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {ComponentInstance, TextWidget} from "@/components/vue";


export interface ICompositePanelProps {
  direction?: 'left' | 'right'
  showNavTitle?: boolean
  defaultOpen?: boolean
  defaultPinning?: boolean
  defaultActiveKey?: number
  activeKey?: number | string
  onChange?: (activeKey: number | string) => void
  title?: ComponentInstance | String
}

export interface ICompositePanelItemProps {
  shape?: 'tab' | 'button' | 'link'
  title?: ComponentInstance | String
  icon?: ComponentInstance | String
  key?: number | string
  href?: string
  onClick?: (e: Event | MouseEvent) => void
  extra?: ComponentInstance | String
}

const parseItems = (slots: any): ComponentInstance[] => {
  const items: ComponentInstance[] = []
  if (slots.default) {
    const arraySlots = slots.default()
    arraySlots.forEach((child: any, index: number) => {
      if (child?.['type'] && child['type']['name'] === "CompositePanelItem") {
        items.push({
          key: child['key'] ?? index,
          ...child['props'],
          children: child['children']
        })
      }
    })
  }
  return items
}

const findItem = (
  items: any[],
  key: string | number
) => {
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    if (key === index) return item
    if (key === item?.key) return item
  }
}

const getDefaultKey = (slots: any) => {
  if (slots.default) {
    const items = parseItems(slots)
    return items?.[0]['key']
  }
}

export const CompositePanel = defineComponent({
  name: 'CompositePanel',
  inheritAttrs: false,
  props: {
    direction: String, // 'left' | 'right'
    showNavTitle: Boolean,
    defaultOpen: Boolean,
    defaultPinning: Boolean,
    defaultActiveKey: Number,
    activeKey: [String, Number],
    onChange: {
      type: Function,
      default: () => {
        return () => {
        }
      }
    },
    title: String
  },
  setup(props, {slots}) {
    const prefix = usePrefix('composite-panel')
    const activeKeyRef = ref(null)
    const pinning = ref(props.defaultPinning ?? false)
    const visible = ref(props.defaultOpen ?? true)
    const activeKey = (
      props.defaultActiveKey ?? getDefaultKey(slots)
    )
    const items = parseItems(slots)
    // 默认激活组件
    const currentItem = findItem(items, activeKey)
    activeKeyRef.value = activeKey
    const content = currentItem?.children
    const renderContent = () => {
      if (!content || !visible) {
        return null
      }
      return <div class={[`${prefix}-tabs-content`, {pinning: pinning.value}]}>
        <div class={`${prefix}-tabs-header`}>
          <div class={`${prefix}-tabs-header-title`}>
            <TextWidget>{currentItem.title}</TextWidget>
          </div>
          <div class={`${prefix}-tabs-header-actions`}>
            <div class={`${prefix}-tabs-header-extra`}>
              {content.extra?.()}
            </div>
            {
              !pinning &&(<div>x</div>)
            }
          </div>
        </div>
        <div class={`${prefix}-tabs-body`}>
          {content.default?.()}
        </div>
      </div>
    }
    onMounted(() => {
    })
    return () => {
      return <Fragment>
        <div class={`${prefix}-tabs`}>
          {slots.default?.()}
        </div>
        {renderContent()}
      </Fragment>
    }
  }
})

export const CompositePanelItem = defineComponent({
  name: 'CompositePanelItem',
  inheritAttrs: false,
  setup(_, {slots}) {
    return () => {
      return <Fragment>{slots.default?.()}</Fragment>
    }
  }
})
