import {inject} from 'vue'

export const useDesigner = () => {
  const engine = inject('engine')
  return engine
}
