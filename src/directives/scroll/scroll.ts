import {Element} from "@/components/vue-formily/core/elements";
import {getElement} from "@/utils/dom/dom";

const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement]
type ScrollCtxType = {
  scrollTarget: Element,
  scroll: () => void
}

export function getVerticalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0
    : scrollTarget.scrollTop
}

export function getHorizontalScrollPosition (scrollTarget) {
  return scrollTarget === window
    ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
    : scrollTarget.scrollLeft
}

function update (ctx, { value, oldValue }) {
  if (typeof value !== 'function') {
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll, false)
    return
  }

  ctx.handler = value
  if (typeof oldValue !== 'function') {
    ctx.scrollTarget.addEventListener('scroll', ctx.scroll, false)
  }
}

export const scroll = {
  name: "scroll",
  mounted(el, binding) {


    let target = getElement(el)

    target = scrollTargets.includes(target) ? window : target
    const ctx: ScrollCtxType = {
      scrollTarget: target,
      scroll(){
        ctx.handler(
          getVerticalScrollPosition(ctx.scrollTarget),
          getHorizontalScrollPosition(ctx.scrollTarget)
        )
      }
    }

    update(ctx, binding)

    el.__qscroll = ctx
  },
  updated (el, binding) {
    if (el.__qscroll !== void 0 && binding.oldValue !== binding.value) {
      update(el.__qscroll, binding)
    }
  },
  beforeUnmount (el) {
    const ctx = el.__qscroll
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll,false)
    delete el.__qscroll
  }
}
