import {defineComponent, onMounted, ref} from "vue"
import useRipple from "../../components/_components/hooks/useRipple";

export const DemoHooks = defineComponent({
  name: 'demo-hooks',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const btnRef = ref<HTMLElement>()
    useRipple(btnRef)

    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {

    })

    return () => {
      return (
        <div class={'full-container'}>
          <button class={'el-button el-button--primary'}>
            测试按钮
          </button>

          <div ref={btnRef}>
            测试div
          </div>
          <el-button type="primary" >测试按钮</el-button>
        </div>
      )
    }
  }
})
