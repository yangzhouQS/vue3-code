import { defineComponent, ref, reactive } from 'vue';

export const FlowChart = defineComponent({
  name: 'FlowChart',
  setup(props) {
    // data
    const data = ref<any>({});
    // methods
    const methods = {
      loadData: () => {
        //
      },
    };
    return () => {
      return <div class={'full-container'}>flowchart</div>;
    };
  }
});
