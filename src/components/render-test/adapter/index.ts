export enum Env {
  React = 'react',
  Rax = 'rax',
  Vue = 'vue'
}

class Adapter {
  runtime: IRuntime;

  builtinModules = ['Component', 'PureComponent', 'createElement', 'createContext', 'forwardRef', 'findDOMNode'];

  env: Env;

  renderers: IRendererModules;

  configProvider: any;

  constructor() {
    this.initRuntime();
  }
}

export default new Adapter()
