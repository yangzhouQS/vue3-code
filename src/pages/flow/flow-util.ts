import {} from 'lodash'
import {IPublicFlowConfig} from "@/pages/flow/types";

export const hasBranch = (data = []) => {
  return Array.isArray(data) && data.length > 0
}

export const isCondition = (data: IPublicFlowConfig) => {
  return data.type === "condition"
}
