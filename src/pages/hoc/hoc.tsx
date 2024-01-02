import {defineComponent, ref, reactive} from 'vue';
// const {ref, defineComponent} = window.Vue;

console.log(window.Vue);
export const TestPage =defineComponent({
  name: 'TestPage',
  slots: ['default'],
  setup(props, {slots}) {
    return () => {
      return <div class={'full-container'}>
        {slots.default && slots.default()}
      </div>;
    };
  }
});
export const HocPage = defineComponent({
  name: 'HocPage',
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
      return <div class={'full-container'}>hoc-page
        <TestPage>
          我是test
        </TestPage>
      </div>;
    };
  }
});
