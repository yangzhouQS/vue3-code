import {defineComponent, Fragment} from 'vue'
import {PCSimulator} from "../simulators";
import {ScreenType} from "../../core";
import {useScreen} from "../hooks/useScreen";

export const Simulator = defineComponent({
  name: "simulator",
  props: {},
  setup(_, {slots}) {
    const screen = useScreen()


    return () => {
      if (screen.type === ScreenType.PC) {
        return <Fragment>
          <PCSimulator>{slots.default?.()}</PCSimulator>
        </Fragment>
      }
      return <PCSimulator>{slots.default?.()}</PCSimulator>
    }
  }
})
