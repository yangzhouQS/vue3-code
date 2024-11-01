import {useDesigner} from "./useDesigner";

export const useWorkspace = (id?: string) => {
  const designer = useDesigner()
  const workspaceId = id
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId)
  }
  return designer.workspace
}
