import hooks, {appContext, appProperties, getComponentName, getRealParent, useRouter} from "@/utils/helpers";
import type {
  ExtractPropTypes,
  StyleValue,
  VNode,
  VNodeArrayChildren,
  VNodeChild,
  getCurrentInstance
} from 'vue'

import {
  onMounted, ref,
  createTextVNode,
  createVNode,
  defineComponent,
  isVNode,
  renderSlot,
} from 'vue'
import {ElButton} from 'element-plus'
export const SpaceContainer = defineComponent({
  name: 'SpaceContainer',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    // data
    const menuConfig = ref([])

    const {router, route} = useRouter()
    console.log(router, route)
    const ctx = appProperties()
    console.log(ctx)
    const cmpName = getComponentName()
    console.log(`cmpName = ${cmpName}`)
    const appContextRet = appContext()
    console.log(`appContext`, appContextRet)

    const realParent = getRealParent(hooks.getCurrentInstance())
    // console.log(realParent)

    const v = getCurrentInstance()
    console.log(v);
    debugger;


    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {

    })

    return () => {
      return (<Space>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </Space>)
      /*return (
        <div className={'full-container'}>
          <el-space
            direction={'vertical'}
            alignment={'center'}
            size={6}
            fill={true}
            fillRatio={100}
            style={"width: '99%'"}
            warp={true}
          >
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </el-space>
        </div>
        <Space>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Space>
      )*/
    }
  }
})

export const Space = defineComponent({
  name: 'Space',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, {slots}) {
    onMounted(() => {

    })

    function extractChildren(
      children: VNodeArrayChildren,
      parentKey = '',
      extractedChildren: VNode[] = []
    ) {
      children.forEach((child,loopKey)=>{
        extractedChildren.push(
          createVNode(
            'div',
            {
              class:'a-a',
              style: {
                width: '100px',
                height: '100px',
                backgroundColor: '#000',
              },
              key: `LoopKey${parentKey + loopKey}`,
            },
            {
              default: () => [child],
            },
          )
        )

        return extractedChildren
      })
    }

    return () => {
      const children = renderSlot(slots, 'default', { key: 0 }, () => [])
      let extractedChildren = extractChildren(children.children)



      return <el-space>
        hello
        hello
        hello
      </el-space>

      return createVNode(
        'div',
        {
          class: 'xxxxx',
          style: {background: 'red'},
        },
        extractedChildren,
      )


      return (
        <div className={'full-container'}>
          {children}
        </div>
      )
    }
  }
})
