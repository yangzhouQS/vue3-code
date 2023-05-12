/**
 * 渲染器接口
 */
export interface BuiltinSimulatorRenderer {
  readonly isSimulatorRenderer: true;
  autoRepaintNode?: boolean;
  components: Record<string, any>;
  rerender: () => void;


  clearState(): void;
  stopAutoRepaintNode(): void;
  enableAutoRepaintNode(): void;
  run(): void;
  load(asset: any): Promise<any>;
}

export function isSimulatorRenderer(obj: any): obj is BuiltinSimulatorRenderer {
  return obj && obj.isSimulatorRenderer;
}
