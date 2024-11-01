import {defineComponent} from 'vue'
import {Workspace} from "./workspace";
import {useWorkbench} from "../hooks/useWorkbench";

export const Workbench = defineComponent({
  name: "workbench",
  props: {},
  setup(_, {slots}) {
    const workbench = useWorkbench()
    return () => {
      return (
        <Workspace id='Workspace'>
          {slots.default?.()}
        </Workspace>
      )
    }
  }
})
