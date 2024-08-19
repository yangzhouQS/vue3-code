import {defineComponent} from 'vue';

export const VirtualList = defineComponent({
  name: 'VirtualList',
  setup(props) {
    return () => {
      return <div>
        component name: VirtualList
      </div>
    }
  }
})
