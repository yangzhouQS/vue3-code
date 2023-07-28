import {
  defineComponent, onMounted, ref,
  getCurrentInstance
} from "vue"

class CacheInstance {
  public cacheMap = new Map()

  constructor() {
    console.log('CacheInstance')
  }

  mountInstance(key, vueInstance) {
    this.cacheMap.set(key, vueInstance)
  }

  getInstance(key: string) {
    return this.cacheMap.get(key)
  }
}

const cacheInstance = new CacheInstance();

export const InnerTestPage = defineComponent({
  name: 'InnerTestPage',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const bg = ref('red')
    const vm = getCurrentInstance()


    const vmUpdate = () => {
      vm?.proxy?.$forceUpdate()
    }

    Object.defineProperty(vm,'vmUpdate',{
      get(){
        return vmUpdate
      },
      set(newVal) {
        bg.value = newVal
      }
    })

    cacheInstance.mountInstance('page',vm)
    return () => {
      return (
        <div style={{background: bg.value}}>
          InnerPage
        </div>
      )
    }
  }
})
export const VmUpdate = defineComponent({
  name: 'VmUpdate',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    onMounted(() => {

    })

    const onClickTest = () => {
      const pageInstance = cacheInstance.getInstance('page')
      pageInstance.vmUpdate = '#5cc50f'
      console.log(pageInstance)
      debugger
    }
    return () => {
      return (
        <div class={'full-container'}>
          <InnerTestPage/>

          <el-button type="primary" onClick={onClickTest}>测试</el-button>
        </div>
      )
    }
  }
})
