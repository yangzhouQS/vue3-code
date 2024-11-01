import {defineComponent, onMounted, ref} from "vue"
import "./project.less"
import {BuiltinSimulatorHostView} from "../builtin-simulator/host-view";

export const ProjectView = defineComponent({
  name: 'ProjectView',
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

    const Simulator = BuiltinSimulatorHostView

    return () => {
      return (
        <div class={'lc-project'}>
          <div class={'lc-simulator-shell'}>
            <Simulator/>
          </div>
        </div>
      )
    }
  }
})
