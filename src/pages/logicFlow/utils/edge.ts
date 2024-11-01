// 规范边初始化数据
import {pick} from "lodash";
import {EdgeConfig} from "../type";

export const pickEdgeConfig = (data): EdgeConfig => pick(data, [
  'id',
  'type',
  'sourceNodeId',
  'targetNodeId',
  'properties',
]);
