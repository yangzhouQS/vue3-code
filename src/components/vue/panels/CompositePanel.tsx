import {defineComponent, ref, effect, Fragment, onMounted} from 'vue'
import {usePrefix} from "@/components/vue/hooks/usePrefix";
import {ComponentInstance, TextWidget} from "@/components/vue";
import {IconWidget} from "@/components/vue/widgets/IconWidget";


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

    /*CompositePanel 子项*/
    const items = parseItems(slots)
    // 默认激活组件
    const currentItem = findItem(items, activeKey)
    activeKeyRef.value = activeKey
    const content = currentItem?.children
    const setPinning = (iconState: boolean) => {
      pinning.value = !!iconState
      console.log(pinning.value, iconState)
    }
    const setVisible = (closeState: boolean) => {
      debugger
      visible.value = !!closeState
      console.log(visible.value, closeState)
    }
    const setActiveKey = (activeKey: any) => {
      activeKeyRef.value = activeKey
      debugger
    }
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
              !pinning && (<IconWidget
                infer="PushPinOutlined"
                class={prefix + '-tabs-header-pin'}
                onClick={() => {
                  setPinning(!pinning)
                }}
              />)
            }
            {
              pinning && (<IconWidget
                infer="PushPinFilled"
                class={prefix + '-tabs-header-pin-filled'}
                onClick={() => {
                  setPinning(!pinning)
                }}
              />)
            }

            <IconWidget
              infer="Close"
              class={prefix + '-tabs-header-close'}
              onClick={setVisible}
            />
            <span onClick={setVisible}></span>
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
      return <div class={[
        prefix,
        {[`direction-${props.direction}`]: !!props.direction},
      ]}>
        <div class={`${prefix}-tabs`}>
          {items.map((item: any, index) => {
            const takeTab = () => {
              if (item.href) {
                return <a href={item.href}>{item.icon}</a>
              }
              return (<IconWidget
                infer={item.icon}
              />)
            }
            const shape = item.shape ?? 'tab'
            const Comp = shape === 'link' ? 'a' : 'div'
            return (
              <Comp
                class={[
                  prefix + '-tabs-pane',
                  {
                    active: activeKey === item.key,
                  }
                ]}
                key={index}
                href={item.href}
                onClick={(e: any) => {
                  if (shape === 'tab') {
                    if (activeKey === item.key) {
                      setVisible(!visible)
                    } else {
                      setVisible(true)
                    }

                    if (!props?.activeKey || !props?.onChange) {
                      setActiveKey(item.key)
                    }
                  }
                  item.onClick?.(e)
                  props.onChange?.(item.key)
                }}
              >
                {props.showNavTitle && item.title ? (
                  <div class={prefix + '-tabs-pane-title'}>
                    <TextWidget>{item.title}</TextWidget>
                  </div>
                ) : null}
                {takeTab()}
              </Comp>
            )

          })}
        </div>
        {renderContent()}
      </div>
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
