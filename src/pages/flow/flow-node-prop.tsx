import {defineComponent, ref, reactive} from 'vue';

export const FlowNodeProp = defineComponent({
  name: 'FlowNodeProp',
  props: {
    value: Boolean
  },
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
      return <el-drawer v-model={props.value}>
        <div class={'full-container flow-node-prop'}>

        </div>
      </el-drawer>
    };
  }
});
