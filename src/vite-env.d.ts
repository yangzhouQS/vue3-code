/// <reference types="vite/client" />

declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "*.tsx" {
  interface HTMLAttributes<T> {
    // Preact supports using "class" instead of "classname" - need to teach typescript
    class: any;

    [key: string]: any
  }
}
