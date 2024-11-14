import {defineComponent} from 'vue';
import ResizeBoxDemo from './resize-box-demo'
export const DemoResizeBox = defineComponent({
  name: 'DemoResizeBox',
  setup(props) {
    return () => {
      return <div>
        component name: DemoResizeBoxxxxxasxsa
        <ResizeBoxDemo/>
      </div>
    }
  }
})
