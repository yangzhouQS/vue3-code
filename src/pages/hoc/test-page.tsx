import {defineComponent, onMounted, ref, onUpdated} from "vue";

export const TestPage = defineComponent({
  name: 'TestPage',
  slots: ['default'],
  props: {
    a: Number
  },
  setup(props, {slots}) {
    const innerAge = ref(22)

    onMounted(() => {
      console.log('onMounted');
    })
    onUpdated(() => {
      console.log('onUpdated');
    })
    return () => {
      const content = <div class={'full-container'}>
        innerAge = {innerAge.value}
        <el-input-number v-model={innerAge.value}></el-input-number>
        <div>
          a = {props.a}
        </div>
        <hr/>
        {slots.default && slots.default()}
      </div>;

      return content // forwardRef(content)
    };
  }
});
