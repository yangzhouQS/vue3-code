// 规范边初始化数据
import {EdgeConfig} from "@/pages/logicFlow/type";
import {pick} from "lodash";

export const pickEdgeConfig = (data): EdgeConfig => pick(data, [
  'id',
  'type',
  'sourceNodeId',
  'targetNodeId',
  'properties',
]);
