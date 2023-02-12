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
    defaultOpen: {
      type: Boolean,
      default: null
    },
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
    shape: {  //  'tab' | 'button' | 'link'
      type: String,
      default: 'tab'
    },
    onItemClick: {
      type: Function,
      default: () => {
      }
    },
    title: String,
  },
  setup(props, {slots}) {
    const prefix = usePrefix('composite-panel')
    const activeKeyRef = ref(null)
    const pinning = ref(props.defaultPinning ?? false)

    // 控制面板
    const visible = ref(props.defaultOpen ?? true)

    // 默认激活的tab key
    const activeKey = ref((
      props.defaultActiveKey ?? getDefaultKey(slots)
    ))
    /*CompositePanel 子项*/
    const items = parseItems(slots)
    // 默认激活组件
    const currentItem = findItem(items, activeKey.value)
    activeKeyRef.value = activeKey
    const content = currentItem?.children
    const setPinning = (iconState: boolean) => {
      pinning.value = !!iconState
    }

    // 控制切换面板
    const setVisible = (closeState: boolean) => {
      console.log('start', visible.value, closeState)
      visible.value = closeState
      console.log('end', visible.value, closeState)
    }

    // 控制切换tab
    const setActiveKey = (key: number) => {
      activeKey.value = key
    }
    const renderContent = () => {
      if (!content || !visible.value) {
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
          </div>
        </div>
        <div class={`${prefix}-tabs-body`}>
          {content.default?.()}
        </div>
      </div>
    }

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
            const shape = props.shape ?? 'tab'
            const Comp = shape === 'link' ? 'a' : 'div'
            return (
              <Comp
                class={[
                  prefix + '-tabs-pane',
                  {
                    active: activeKey.value === item.key,
                  }
                ]}
                key={index}
                href={item.href}
                onClick={(e: any) => {

                  if (shape === 'tab') {
                    if (activeKey.value === item.key) {
                      setVisible(!visible.value)
                    } else {
                      setVisible(true)
                    }

                    if (!props?.activeKey || !props?.onChange) {
                      setActiveKey(item.key)
                    }
                  }
                  props.onItemClick?.(e)
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
