import {inject} from 'vue'

export const useDesignerLayout = () => {
  const prefixCls = inject('prefixCls')
  const position = inject('position')
  const theme = inject('theme')
  const variables = inject('variables')
  return {
    prefixCls,
    position,
    theme,
    variables,
  }
}
