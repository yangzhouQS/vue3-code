
import {ComponentPublicInstance} from 'vue';
import {Engine} from "../core";

export type ComponentInstance = ComponentPublicInstance;

/**
 * 设计器layput props
 */
export interface IDesignerLayoutProps {
  prefixCls?: string
  theme?: 'dark' | 'light' | (string & {})
  variables?: Record<string, string>
  position?: 'fixed' | 'absolute' | 'relative'
}

// 设计器 props
export interface IDesignerProps extends IDesignerLayoutProps {
  engine: Engine
}

export interface IDesignerComponents {
  [key: string]: ComponentInstance
}

export interface IDesignerLayoutContext {
  theme?: 'dark' | 'light' | (string & {})
  prefixCls: string
  position: 'fixed' | 'absolute' | 'relative'
}

// 工作空间上下文
export interface IWorkspaceContext {
  id: string
  title?: string
  description?: string
}



export {}
