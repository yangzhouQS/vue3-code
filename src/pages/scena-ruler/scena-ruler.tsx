import {defineComponent, onMounted, ref} from "vue"
import Ruler from "@scena/ruler";
export const ScenaRuler = defineComponent({
  name: 'ScenaRuler',
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
      const ruler = new Ruler(document.body, {
        type: "horizontal",
        width: 900,
        height: 1900
      });


      window.addEventListener("resize", () => {
        ruler.resize();
      });
    })

    return () => {
      return (
        <div class={'full-container overflow-auto'} >
          xxx
          <div style={{height: '10000px',backgroundColor: 'red'}}></div>
        </div>
      )
    }
  }
})
