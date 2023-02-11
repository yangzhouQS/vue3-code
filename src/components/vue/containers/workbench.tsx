import {defineComponent} from 'vue'
import {Workspace} from "@/components/vue";
import {useWorkbench} from "@/components/vue/hooks/useWorkbench";

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
