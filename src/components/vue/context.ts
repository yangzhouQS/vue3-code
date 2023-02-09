import {ref} from 'vue'
import {createGlobalState} from '@vueuse/core'

export const DesignerComponentsContext = createGlobalState(() => {

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

export {}
