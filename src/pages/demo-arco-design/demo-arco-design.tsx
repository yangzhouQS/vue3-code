import {defineComponent} from 'vue';
import TTreeDemo from './t-tree-demo';
export const DemoArcoDesign = defineComponent({
  name: 'DemoArcoDesign',
  setup(props) {
    const treeData = [
      {
        title: 'Trunk 0-0',
        key: '0-0',
        children: [
          {
            title: 'Branch 0-0-0',
            key: '0-0-0',
            disabled: true,
            children: [
              {
                title: 'Leaf',
                key: '0-0-0-0',
              },
              {
                title: 'Leaf',
                key: '0-0-0-1',
              }
            ]
          },
          {
            title: 'Branch 0-0-1',
            key: '0-0-1',
            children: [
              {
                title: 'Leaf',
                key: '0-0-1-0',
              },
            ]
          },
        ],
      },
    ];
    return () => {
      return (<TTreeDemo></TTreeDemo>)
      return <div>

       {/* <a-tree
        data={treeData}
        default-expanded-keys={['0-0-0']}
        default-selected-keys={['0-0-0', '0-0-1']}
        >
          {{
            title:(data)=>{
              console.log(data);
              return <span>{data.title}</span>
            }
          }}
        </a-tree>*/}
      </div>
    }
  }
})
