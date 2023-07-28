import {defineComponent, onMounted, ref, h} from "vue"

import {ElButton} from 'element-plus'
import {Hoc} from "@/components/render-test/core/hoc";

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
    const menuConfig = ref([])

    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {

    })
    const test = () => {
      console.log('测试')
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
