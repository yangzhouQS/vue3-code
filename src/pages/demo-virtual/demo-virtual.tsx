import {defineComponent} from 'vue';

export const DemoVirtual = defineComponent({
  name: 'DemoVirtual',
  setup(props) {
    return () => {
      return <div>
        component name: DemoVirtual
      </div>
    }
  }
})
