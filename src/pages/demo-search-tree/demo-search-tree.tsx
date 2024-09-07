import {defineComponent, ref, SetupContext} from 'vue';
import {SearchTree} from "./search-tree";
import {useSearchTreeState} from "./hook/useSearchTreeState";

export const DemoSearchTree = defineComponent({
  name: 'DemoSearchTree',
  setup(props, context: SetupContext) {
    const items = ref([
      {
        label: '第一段',
        id: 1,
        children: [
          {
            label: '第二段',
            id: 2
          },
          {
            label: '第二段',
            id: 3
          }
        ]
      },
      {
        label: '第一段',
        id: 4,
        children: [
          {
            label: '第二段',
            id: 5
          },
          {
            label: '第二段',
            id: 6
          }
        ]
      },
      {
        label: '第一段',
        id: 7,
        children: [
          {
            label: '第二段',
            id: 8
          },
          {
            label: '第二段',
            id: 9
          }
        ]
      },
      {
        label: '第一段',
        id: 10,
        children: [
          {
            label: '第二段',
            id: 11
          },
          {
            label: '第二段',
            id: 12
          }
        ]
      }
    ])
    return () => {
      return <div>
        component name: DemoSearchTree
        <SearchTree data={items.value}>

        </SearchTree>
      </div>
    }
  }
})
