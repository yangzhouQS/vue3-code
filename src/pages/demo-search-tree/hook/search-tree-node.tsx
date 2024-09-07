import { defineComponent } from 'vue'

export const SearchTreeNode = defineComponent({
  name: 'SearchTreeNode',
  setup(props) {
    return () => {
      return <div>
        component name: SearchTreeNode
      </div>
    }
  }
})
