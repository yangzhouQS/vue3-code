import {
  Ref,
  watch,
  isRef,
  unref,
  onUnmounted,
  onDeactivated,
  type WatchStopHandle
} from 'vue'
import { onMountedOrActivated } from '../onMountedOrActivated'

type TargetRef = EventTarget | Ref<EventTarget | undefined>

export type UseEventListenerOptions = {
  target?: TargetRef
  capture?: boolean
  passive?: boolean
}

export function useEventListener<K extends keyof DocumentEventMap>(
  type: K,
  listener: (event: DocumentEventMap[K]) => void,
  options?: UseEventListenerOptions,
): () => void
export function useEventListener(
  type: string,
  listener: EventListener,
  options?: UseEventListenerOptions,
): () => void
export function useEventListener(
  type: string,
  listener: EventListener,
  options: UseEventListenerOptions = {}
) {
  const { target = window, passive = false, capture = false } = options

  let cleaned = false
  let attached: boolean

  const add = (target?: TargetRef) => {
    if (cleaned) {
      return
    }
    const element = unref(target)

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive
      })
      attached = true
    }
  }

  const remove = (target?: TargetRef) => {
    if (cleaned) {
      return
    }
    const element = unref(target)

    if (element && attached) {
      element.removeEventListener(type, listener, capture)
      attached = false
    }
  }

  onUnmounted(() => remove(target))
  onDeactivated(() => remove(target))
  onMountedOrActivated(() => add(target))

  let stopWatch: WatchStopHandle

  if (isRef(target)) {
    stopWatch = watch(target, (val, oldVal) => {
      remove(oldVal)
      add(val)
    })
  }

  /**
   * Clean up the event listener
   */
  return () => {
    stopWatch?.()
    remove(target)
    cleaned = true
  }
}

/*
// 使用示例
import { ref } from 'vue';
import { useEventListener } from '';

export default {
  setup() {
    // 在 window 上绑定 resize 事件
    // 未指定监听对象时，默认会监听 window 的事件
    useEventListener('resize', () => {
      console.log('window resize');
    });

    // 在 body 元素上绑定 click 事件
    // 返回一个清理函数，用于手动移除事件监听
    const cleanup = useEventListener(
      'click',
      () => {
        console.log('click body');
      },
      { target: document.body },
    );

    // 返回一个清理函数，用于手动移除事件监听
    cleanup();
  },
};

*/
