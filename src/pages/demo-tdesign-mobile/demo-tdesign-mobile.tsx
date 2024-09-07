import {defineComponent} from 'vue';
import loadingTarget from './loading-target.vue';
import loadingFunc from './loading-func.vue';

export const DemoTdesignMobile = defineComponent({
  components: {loadingTarget,loadingFunc},
  name: 'DemoTdesignMobile',
  setup(props) {
    return () => {
      return <div>
        component name: DemoTdesignMobile
        <h2>挂载到指定元素</h2>
        <loading-target/>
        <br/>
        <br/>
        <br/>
        <h2>函数方式调用</h2>
        <loadingFunc/>
      </div>
    }
  }
})


