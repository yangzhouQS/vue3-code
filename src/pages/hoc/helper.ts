import {defineComponent, h} from "vue";
import {createForwardRef, forwardRef} from "./forward-ref";


export function createHoc(
  component: any,
  overrideExposed?: Record<string, any>,
  createInRender?: boolean
) {
  return defineComponent({
    name: 'Wrapper',
    setup() {
      const forward = createForwardRef(null, overrideExposed)

      return () => {
        return createInRender
          ? forwardRef(component)
          : h(component, {
            ref: forward
          })
      }
    }
  })
}
