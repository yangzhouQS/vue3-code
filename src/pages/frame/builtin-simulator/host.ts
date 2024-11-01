import {BuiltinSimulatorRenderer} from "./renderer";
import {createSimulator} from "./create-simulator";


export class BuiltinSimulatorHost {
  private _renderer?: BuiltinSimulatorRenderer;
  get renderer() {
    return this._renderer;
  }

  private _iframe?: HTMLIFrameElement;

  private _contentWindow?: Window;
  private _contentDocument?: Document;

  constructor() {
    //
  }

  async mountContentFrame(iframe: HTMLIFrameElement | null) {
    if (!iframe || this._iframe === iframe) {
      return;
    }
    this._iframe = iframe;

    // iframe 文档对象和window对象
    this._contentWindow = iframe.contentWindow!;
    this._contentDocument = this._contentWindow.document;

    // wait 准备 iframe 内容、依赖库注入

    // <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    await createSimulator(this, iframe)
  }
}
