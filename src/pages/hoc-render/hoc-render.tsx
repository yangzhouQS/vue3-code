import {defineComponent, onMounted, ref, h} from "vue"
import {Hoc} from "../../components/render-test/core/hoc";


export const TestButton = defineComponent({
  name: 'TestButton',
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots, attrs}) {
    onMounted(() => {

    })

    return () => {
      return h(Hoc, {
        __comp: 'ElButton'
      }, slots)
    }
  }
})
export const HocRender = defineComponent({
  name: 'HocRender',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    // data
    const btnRef = ref()
    const testBtnRef = ref()
    const testBtnRef2 = ref()

    // methods
    const methods = {
      loadData: () => {
        console.log(window)
        console.log(window.Vue)
        console.log(testBtnRef)
        console.log(testBtnRef2)
        console.log(btnRef)
        debugger
      }
    }

    onMounted(() => {

    })
    const test = () => {
      console.log('测试')
    }

    return ()=>{
     return <div>
       <el-button ref={testBtnRef2}>测试xxx</el-button>
       <button ref={testBtnRef}>测试</button>
       <tiny-row>
         <tiny-button ref={btnRef}>按钮</tiny-button>
         <tiny-button type="primary" onClick={methods.loadData}> 主要按钮 </tiny-button>
         <tiny-button type="success"> 成功按钮 </tiny-button>
         <tiny-button type="info"> 信息按钮 </tiny-button>
         <tiny-button type="warning"> 警告按钮 </tiny-button>
         <tiny-button type="danger"> 危险按钮 </tiny-button>
       </tiny-row>
     </div>
    }
    return () => {
      return (
        <div class={'full-container'}>
          <el-button
            type="primary"
            onClick={test}
            size={'large'}
            loading={true}
          >
            测试
          </el-button>
          {
            h(
              Hoc,
              {
                __comp: 'ElButton',
                __props: {
                  size: 'large',
                  type: 'primary',
                },

                __schema: {
                  children: [],
                  componentName: 'ElButton',
                  dataSource: {},
                  docId: 'a123',
                  id: "node_dockcviv8fo1",
                  isLocked: false,
                },

                __vnodeProps: {},
                compProps: {},

                // 其他属性
                round: true
              },
              {
                default: () => 'default slot',
              }
            )
          }
        </div>
      )
    }
  }
})
