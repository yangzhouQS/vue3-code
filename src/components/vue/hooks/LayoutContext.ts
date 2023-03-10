import {createGlobalState} from '@vueuse/core'
import {ref, reactive, toRefs} from 'vue'

export const useLayoutContext = createGlobalState(
  () => {
    // state
    const layoutState = reactive({
      theme: 'light',
      prefixCls: '',
      variables: '',
      position: 'fixed',
    })

    // getters
    // const doubleCount = computed(() => count.value * 2)

    // actions
    /* function increment() {
       count.value++
     }*/

    function setState(state: object) {
      Object.assign(layoutState.values, state)
    }


    function setTheme(theme: string) {
      layoutState.theme = theme
    }

    function setPosition(position: string) {
      layoutState.position = position
    }

    return {layoutState, setTheme, setPosition, setState}
  }
)
