import {ref} from 'vue'
import {createGlobalState} from '@vueuse/core'
import {Engine} from "../core";

export const useGlobalContext = createGlobalState(() => {
  const engine = ref<Engine>()

  function setEngine(val: Engine) {
    engine.value = val
  }

  return {
    setEngine,
    engine
  }
})
export const DesignerComponentsContext = createGlobalState(() => {
  const engine = ref<Engine>()
  return {
    engine
  }
})

export const DesignerLayoutContext = createGlobalState(() => {

})

export const DesignerEngineContext = createGlobalState(() => {

})

export const TreeNodeContext = createGlobalState(() => {
  const theme = ref('')
  const prefixCls = ref('')
  const position = ref('')
  return {
    theme,
    prefixCls,
    position
  }
})

export const WorkspaceContext = createGlobalState(() => {
  const id = ref('')
  const title = ref('')
  const description = ref('')
  return {
    id,
    title,
    description
  }
})

