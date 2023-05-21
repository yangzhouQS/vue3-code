import {defineComponent, onMounted, ref} from "vue"
import {BemTools} from "./bem-tools";
import "./host.less"
import {BuiltinSimulatorHost} from "@/pages/frame/builtin-simulator/host";

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
    const host: BuiltinSimulatorHost = new BuiltinSimulatorHost()

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
          <Canvas host={host}/>
        </div>
      )
    }
  }
})


export const Canvas = defineComponent({
  name: 'Canvas',
  props: {
    host: {
      type: Object as PropType<BuiltinSimulatorHost>
    }
  },
  setup(props) {
    return () => {
      return (
        <div class={'class="lc-simulator-canvas lc-simulator-device-default"'}>
          <div class={'lc-simulator-canvas-viewport'}>
            <BemTools/>
            <Content host={props.host}/>
          </div>
        </div>
      )
    }
  }
})

export const Content = defineComponent({
  name: 'Content',
  props: {
    host: {
      type: Object as PropType<BuiltinSimulatorHost>
    }
  },
  setup(props) {
    const sim = props.host
    const frameRef = ref();
    const frameStyle: any = {
      transform: `scale(1)`,
      height: "100%",
      width: "100%",
    };

    const mountRender = (el) => {
      if (el){
        el.onload=()=>{
          props.host?.mountContentFrame(el)
        }
      }
    }
    return () => {
      return (
        <div class={'lc-simulator-content'}>
          <iframe
            name={`SimulatorRenderer`}
            className="lc-simulator-content-frame"
            style={frameStyle}
            ref={mountRender}
          />
        </div>
      )
    }
  }
})

