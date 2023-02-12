import { useSelected } from '@/components/vue/hooks/useSelected'
import { useTree } from '@/components/vue/hooks/useTree'

export const useCurrentNode = (workspaceId?: string) => {
  const selected = useSelected(workspaceId)
  const tree = useTree(workspaceId)
  return tree?.findById?.(selected[0])
}
