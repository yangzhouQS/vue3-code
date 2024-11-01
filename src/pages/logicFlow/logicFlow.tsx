import {defineComponent, ref} from 'vue';

export const LogicFlow = defineComponent({
  name: 'LogicFlow',
  setup(props) {
    // data
    const value2 = ref<any>({});
    // methods
    const methods = {
      loadData: () => {
        //
      },
    };
    const form = ref({})
    return () => {
      return <div class={'full-container'}>
        <el-date-picker
          v-model={value2.value}
          type="datetimerange"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="YYYY-MM-DD hh:mm:ss"
          onChange={(val)=>{
            console.log(val);
            console.log(value2.value);
          }}
        />
        <el-form ref="form" model={form.value} label-width="80px">
          <el-form-item label="Activity name" prop="name">
          </el-form-item>
        </el-form>
      </div>;
    };
  }
});
