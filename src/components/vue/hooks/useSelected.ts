import {useSelection} from "@/components/vue/hooks/useSelection"

export const useSelected = (workspaceId?: string) => {
  const selection = useSelection(workspaceId)
  return selection?.selected || []
}
