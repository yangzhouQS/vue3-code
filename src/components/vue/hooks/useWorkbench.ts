import {useDesigner} from "@/components/vue/hooks/useDesigner";

export const useWorkbench = () => {
  const designer = useDesigner()
  return designer.workbench
}
