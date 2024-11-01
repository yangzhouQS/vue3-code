import {pick} from 'lodash';
import {NodeConfig} from "../type";


/**
 * 规范节点初始化数据
 * @param data
 */
export const pickNodeConfig = (data): NodeConfig => {
  return pick(data, ['id', 'type', 'properties']) as NodeConfig;
}
