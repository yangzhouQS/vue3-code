import {defineComponent, ref, onMounted} from 'vue';
export const TestSelect = defineComponent({
  name: 'TestSelect',
  setup(props) {
    // data
    const data = ref('');
    const selRef = ref()
    // methods
    const methods = {
      loadData: () => {
        //
      },
    };

    const onChange = (val) => {
      console.log(val);
      if (val===''){
        selRef.value.hasModelValue = true;

      }
      console.log(selRef.value.hasModelValue);
      console.log('ref ',selRef.value.hasModelValue);
    }
    onMounted(() => {
      
      selRef.value.hasModelValue = function () {
        console.log('arguments');
        return false
      }
    })
    return () => {
      return <div class={'full-container'}>
        <el-select
          v-model={data.value}
          placeholder="hello placeholder"
          ref={selRef}
          onChange={onChange}>
          <el-option value={''} label={'全部'}>全部</el-option>
          <el-option value={'AAA'} label={'AAA'}>AAA</el-option>
          <el-option value={'BBB'} label={'BBB'}>BBB</el-option>
        </el-select>
      </div>;
    };
  }
});
