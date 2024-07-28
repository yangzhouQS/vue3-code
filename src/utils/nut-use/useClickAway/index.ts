import { Ref, unref } from 'vue'
import { useEventListener } from '../useEventListener'

export type UseClickAwayOptions = {
  eventName?: string
}

/**
 * 监听点击元素外部的事件
 * @param {Element | Ref<Element | undefined> | Array<Element | Ref<Element | undefined>>} target
 * @param {EventListener} listener
 * @param {UseClickAwayOptions} options
 */
export function useClickAway(
  target:
    | Element
    | Ref<Element | undefined>
    | Array<Element | Ref<Element | undefined>>,
  listener: EventListener,
  options: UseClickAwayOptions = {}
) {
  const { eventName = 'click' } = options

  const onClick = (event: Event) => {
    const targets = Array.isArray(target) ? target : [target]
    const isClickAway = targets.every((item) => {
      const element = unref(item)
      return element && !element.contains(event.target as Node)
    })

    if (isClickAway) {
      listener(event)
    }
  }

  useEventListener(eventName, onClick, { target: document })
}
