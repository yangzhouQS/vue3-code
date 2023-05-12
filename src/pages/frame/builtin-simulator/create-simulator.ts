import {BuiltinSimulatorHost} from "@/pages/frame/builtin-simulator/host";

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

  win._ = window._;

  const styles: any = {};
  const scripts: any = {};


  const styleFrags = Object.keys(styles)
    .map((key) => {
      return `${styles[key].join('\n')}<meta level="${key}" />`;
    })
    .join('');
  const scriptFrags = Object.keys(scripts)
    .map((key) => {
      return scripts[key].join('\n');
    })
    .join('');

  doc.open();
  doc.write(`
<!doctype html>
<html class="engine-design-mode">
  <head><meta charset="utf-8"/>
    ${styleFrags}
  </head>
  <body>
    ${scriptFrags}
  </body>
</html>`);
  doc.close();

  return new Promise((resolve) => {
    const renderer = win.SimulatorRenderer;
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
