import { ref } from "vue"

function createInstance() {
  const comp = {
    setup() {
      const visible = ref(false)

      let attrs = {}
      const open = opts => {
        visible.value = true
        attrs = opts
      }

      const close = () => {
        visible.value = false
      }

      const toggle = val => {
        visible.value = val
      }

      const render = () => {
        attrs = {
          ...attrs,
          visible: visible.value,
          'onUpdate:visible': toggle
        }

        return h(ContextMenu, attrs)
      }

      // rewrite render function
      getCurrentInstance().render = render

      return {
        open,
        close
      }
    }
  }
  const { instance } = mountComponent(comp, 'context-menu-wrapper-root')

  return instance
}
