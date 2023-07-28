const UNSET = Symbol('unset');
export type RendererConsumer<T> = (renderer: any, data: T) => Promise<any>;
import {watchEffect} from 'vue'
// master 进程
//  0. 初始化该对象，因为需要响应变更发生在 master 进程
//  1. 提供消费数据或数据提供器，比如 Asset 资源，如果不是数据提供器，会持续提供
//  2. 收到成功通知
// renderer 进程
//  1. 持续消费，并持续监听数据
//  2. 消费

// 这里涉及俩个自定义项
//  1. 被消费数据协议
//  2. 消费机制（渲染进程自定 + 传递进入）

export default class ResourceConsumer<T = any> {
  // @obx.ref private _data: T | typeof UNSET = UNSET;
  private _data: T | typeof UNSET = UNSET;

  private _providing?: () => void;

  private _consuming?: () => void;

  private _firstConsumed = false;

  private resolveFirst?: (resolve?: any) => void;

  constructor(provider: () => T, private consumer?: RendererConsumer<T>) {
    // makeObservable(this);
    this._providing = watchEffect(() => {
      this._data = provider();
    })
  }

  consume(consumerOrRenderer: ((data: T) => any)) {
    // 已经存在消费者
    if (this._consuming) {
      return;
    }
    let consumer = consumerOrRenderer;
    this._consuming = watchEffect(async () => {
      // 生产者未提供数据，无法消费
      if (this._data === UNSET) {
        return;
      }
      await consumer(this._data);
      // TODO: catch error and report
      if (this.resolveFirst) {
        this.resolveFirst();
      } else {
        this._firstConsumed = true;
      }
    });
  }

  dispose() {
    if (this._providing) {
      this._providing();
    }
    if (this._consuming) {
      this._consuming();
    }
  }

  waitFirstConsume(): Promise<any> {
    if (this._firstConsumed) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this.resolveFirst = resolve;
    });
  }
}
