import {defineComponent, effect, onMounted, PropType} from 'vue'
import type {editor} from 'monaco-editor';
import * as monaco from 'monaco-editor'
import './index.css'
import "monaco-editor/min/vs/loader"
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  }
};
// require.config("monaco-editor/min/vs")
export const MonacoEditor = defineComponent({
  name: 'MonacoEditor',
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    theme: { // light
      type: String,
      default: () => {
        return 'vs-dark'
      }
    },
    // https://blog.csdn.net/qq2523208472/article/details/120073693
    options: { // Monaco editor options
      type: Object as PropType<Record<string, any>>,
      default: () => {
        return {
          codeLens: true,
          minimap: {
            enabled: false // 是否启用预览图
          },
          readOnly: false, // 是否为只读模式
          theme: 'vs'// vs, hc-black, or vs-dark
        }
      }
    },
    width: {
      type: Number,
      default: () => {
        return 100
      }
    },
    height: {
      type: Number,
      default: () => {
        return 100
      }
    },
  },
  setup(props) {
    onMounted(() => {

    })
    const initEditor = (dom) => {
      if (!dom) return
      monaco.editor.create(dom, {
        value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
        language: 'typescript',
        ...props.options
      });
    }
    return () => {
      return (
        <div style={{width: "1200px", height: "600px", border: "1px solid red"}} ref={initEditor}>
        </div>
      )
    }
  }
})
