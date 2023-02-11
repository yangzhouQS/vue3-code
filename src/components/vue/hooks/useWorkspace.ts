import {useDesigner} from "@/components/vue/hooks/useDesigner";

export const useWorkspace = () => {
  const designer = useDesigner()

  return designer.workspace
}
