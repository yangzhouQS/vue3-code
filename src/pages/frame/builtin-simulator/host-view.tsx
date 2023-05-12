import {defineComponent, onMounted, ref} from "vue"
import {BemTools} from "./bem-tools";
import "./host.less"

export const HostView = defineComponent({
  name: 'HostView',
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
          HostView
        </div>
      )
    }
  }
})


export const BuiltinSimulatorHostView = defineComponent({
  name: 'BuiltinSimulatorHostView',
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
        <div class={'lc-simulator'}>
          <Canvas/>
        </div>
      )
    }
  }
})


export const Canvas = defineComponent({
  name: 'Canvas',
  props: {},
  setup() {
    return () => {
      return (
        <div class={'lc-simulator'}>
          <BemTools/>
          <Content/>
        </div>
      )
    }
  }
})

export const Content = defineComponent({
  name: 'Content',
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

    const frameStyle: any = {
      transform: `scale(1)`,
      height: "1200px",
      width: "600px",
    };

    return () => {
      return (
        <div class={'lc-simulator-content'}>
          <iframe
            name={`SimulatorRenderer`}
            class="lc-simulator-content-frame"
            style={frameStyle}
          />
        </div>
      )
    }
  }
})

