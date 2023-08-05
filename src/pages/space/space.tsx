import {
  defineComponent, onMounted, ref, renderSlot
} from "vue"
import hooks, {appContext, appProperties, getComponentName, getRealParent, useRouter} from "@/utils/helpers";

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
    console.log(realParent)
    debugger


    // methods
    const methods = {
      loadData: () => {

      }
    }

    onMounted(() => {

    })

    return () => {
      return (
        <Space>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Space>
      )
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

    return () => {
      const children = renderSlot(slots, 'default')
      return (
        <div className={'full-container'}>
          xxx
          {children}
        </div>
      )
    }
  }
})
