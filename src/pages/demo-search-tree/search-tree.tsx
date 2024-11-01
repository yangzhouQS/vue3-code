import {defineComponent, SetupContext, TransitionGroup, h} from 'vue';
import TreeProps from './props'
import {useSearchTreeState} from "./hook/useSearchTreeState";

export const SearchTree = defineComponent({
  name: 'SearchTree',
  props: {
    ...TreeProps
  },
  setup(props, context: SetupContext) {
    const {state} = useSearchTreeState(props, context)

    return () => {
      let treeNodeList = (<TransitionGroup
        tag="div"
      >

      </TransitionGroup>)
      return <div>
        component name: SearchTree
      </div>
    }
  }
})
