import {defineComponent, onMounted, ref} from "vue"
import "./designer.less";
import {ProjectView} from "@/pages/frame/builtin-simulator";

export const DesignerView = defineComponent({
  name: 'DesignerView',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const menuConfig = ref([])

    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {

    })

    return () => {
      return (
        <div class={'lc-designer'}>
          {/*拖拽模拟器位置*/}

          {/*工程项目视图*/}
          <ProjectView/>
        </div>
      );
    }
  }
})
