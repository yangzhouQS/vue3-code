import { defineComponent, ref, reactive } from 'vue';

export const LogicFlow = defineComponent({
  name: 'LogicFlow',
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
      return <div class={'full-container'}>LogicFlow</div>;
    };
  }
});
