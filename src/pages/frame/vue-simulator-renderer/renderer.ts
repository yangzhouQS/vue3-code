import {BuiltinSimulatorRenderer} from "@/pages/frame/builtin-simulator/renderer";


export class SimulatorRendererContainer implements BuiltinSimulatorRenderer {
  autoRepaintNode: boolean;
  components: Record<string, any>;
  readonly isSimulatorRenderer: true;

  rerender(): void {
  }

  clearState(): void {
  }

  enableAutoRepaintNode(): void {
  }

  load(asset: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  run(): void {
  }

  stopAutoRepaintNode(): void {
  }

  constructor() {
    console.log('SimulatorRendererContainer constructor')
  }



  dispose() {
    console.log('dispose')
  }
}

export default new SimulatorRendererContainer();
