import { defineComponent, ref, reactive } from 'vue';

export const page = defineComponent({
  name: 'prop-drawer',
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
      return <div class={'full-container'}>prop-drawer</div>;
    };
  }
});
