import {useDesigner} from "@/components/vue/hooks/useDesigner";

export const useScreen = () => {
  return useDesigner().screen
}
