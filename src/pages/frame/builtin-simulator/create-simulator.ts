import {BuiltinSimulatorHost} from "./host";
import {CSSUrlLibraryAsset, JSUrlLibraryAsset} from "../config";

/**
 * 插件渲染器，处理依赖
 */
export function createSimulator(
  host: BuiltinSimulatorHost,
  iframe: HTMLIFrameElement,
  vendors = [],
): Promise<any> {
  const win: any = iframe.contentWindow;
  const doc = iframe.contentDocument!;

  win.AssemCodeEngine = {};
  win.AssemHost = host;
  win._ = window._;

  const styleFrags = CSSUrlLibraryAsset.map((url) => {
    return `<link rel="stylesheet" href="${url}" />`
  }).join('');

  const scriptFrags = JSUrlLibraryAsset.map((url) => {
    return `<script src="${url}"></script>`
  }).join('');

  doc.open();
  doc.write(`
<!doctype html>
<html class="engine-design-mode">
  <head><meta charset="utf-8"/>
    ${styleFrags}

    <style>
    html,body{
    width: 100%;
    height: 100%;
    }
    *{
    margin: 0;padding: 0;
    }
</style>
  </head>
  <body>
    ${scriptFrags}


    <div id="app">
    {{ message }}
    <br>
    <input type="text" v-model="message">
    </div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
  </body>
</html>`);
  doc.close();

  return new Promise((resolve) => {
    const renderer = win.AssemRenderer;
    if (renderer) {
      return resolve(renderer);
    }
    const loaded = () => {
      resolve(win.SimulatorRenderer || host.renderer);
      win.removeEventListener('load', loaded);
    };
    win.addEventListener('load', loaded);
  })
}
