import {defineComponent, onMounted, ref} from "vue";
console.log(window)

export const UnocssPage = defineComponent({
  name: 'UnocssPage',
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
        <div class={'full-container'}>
          UnocssPage
          <div class="text-right">
            csddcs
          </div>
          <span class="p-5">span</span>
          <el-button type="primary">buttonCont</el-button>
        </div>
      )
    }
  }
})
