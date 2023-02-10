import {IPublicTypeEngineGetResult, IPublicTypeEngineValueKey} from "@/components/core/types";

export class Common {
  constructor() {
    console.log('Common')
  }

  private context = new Map<IPublicTypeEngineValueKey, any>();

  set(key: IPublicTypeEngineValueKey, data: any): void | Promise<void> {
    this.context.set(key, data);
  }

  get<T = undefined, KeyOrType = any>(keyOrType: KeyOrType,): IPublicTypeEngineGetResult<T, KeyOrType> | undefined {
    return this.context.get(keyOrType as any);
  }

  has(keyOrType: IPublicTypeEngineValueKey): boolean {
    return this.context.has(keyOrType)
  }
}

let _common = null
if (!_common) {
  _common = new Common()
}
export const common = _common
