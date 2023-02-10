import {Engine} from "@/components/core";

export interface IRenderContext {
  engine: Engine
}

export class RenderContext implements IRenderContext{
  engine: Engine;

  constructor() {
  }
}
