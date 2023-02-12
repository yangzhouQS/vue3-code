import {defineComponent, Fragment} from 'vue'
import {useScreen} from "@/components/vue/hooks/useScreen";
import {ScreenType} from "@/components/core";
import {PCSimulator} from "@/components/vue";

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
