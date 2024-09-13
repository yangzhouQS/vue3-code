import {Ref, unref} from "vue";

export const getElement = (el: string | Ref) => {
  if (!el) {
    return null;
  }
  if (typeof el === 'string') {
    try {
      return document.querySelector(el);
    } catch (e) {
      return null;
    }
  }
  const target = unref(el)
  if (target) {
    return target.$el || target
  }
}
