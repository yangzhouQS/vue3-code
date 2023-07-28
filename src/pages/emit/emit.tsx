import {
  defineComponent,
  onMounted,
  ref,
  watchEffect,
  getCurrentInstance,
  effectScope,
  reactive,
  onBeforeUpdate,
  Ref,
  computed
} from "vue"
import type {EffectScope} from 'vue'
import ResourceConsumer from "@/pages/emit/resource-consumer";

interface IViewport {
  get width(): number

  get height(): number
}

class Viewport implements IViewport {
  private _width: Ref<number>;
  private _height: Ref<number>;

  constructor() {
    this.makeObservable()
  }

  makeObservable() {
    this._width = ref(5);
    this._height = ref(5);
  }

  get height(): number {
    return this._height.value;
  }

  get width(): number {
    return this._width.value;
  }

  set width(width: number) {
    this._width.value += width
  }

  set height(height: number) {
    this._height.value += height
  }
}

class SimRender {
  private _count = 10;
  private _scope: EffectScope

  readonly viewport = new Viewport()


  constructor() {
    console.log('simRender')
    this._scope = effectScope()
  }


  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count += value;
    console.log('count = ', this._count)
  }
}

const editHooks = () => {
  const instance = getCurrentInstance()!

  onMounted(() => {
    /* if (instance && instance.render) {
       instance.render = () => {
         return <div>hello</div>
       }
     }
     if (instance && instance.proxy.$props) {
       instance.proxy.$props.title = "hello aaaa"
     }*/
    console.log('editHooks onMounted')

    if (instance.proxy?.$el) {
      const el = instance.proxy.$el
      const dom = document.createElement('div')
      dom.id = 'xxx'
      dom.innerHTML = el
      el.parentNode.appendChild(dom)
      console.log(el.parentNode)
      instance.proxy.$el.__nodeId = "hello"
    }
  })
  onBeforeUpdate(() => {
    console.log('editHooks onBeforeUpdate')
  })

  if (instance && instance.vnode && instance.vnode) {

  }
}

export const TestEmit = defineComponent({
  name: 'emit',
  props: {
    title: {
      type: String,
      default: 'aa'
    }
  },
  setup(props) {

    const index = ref(0);
    const dataIndex = computed(() => index)
    const message = () => {

    }

    const componentsConsumer = new ResourceConsumer(() => {
      // 为消费者提供的数据
      return dataIndex.value
    });


    componentsConsumer.consume((data: any) => {
      console.log('生产者提供数据 =>', data)
    })


    // 消费一次
    ;(async () => {
      const ret = await componentsConsumer.waitFirstConsume()
      console.log(ret)
    })()

    // editHooks()
    const host = new SimRender()
    // const host = reactive(_host)
    const abc = 123;
    const age = ref(6)

    // methods
    const methods = {
      consumer: () => {
        console.log('consumer')
        index.value += 10
      },
      test: () => {
        host.viewport.width = 10;
        host.viewport.height = 10;
        host.count = 10
      }
    }

    onMounted(() => {

    })

    const viewportStyle = computed(() => {
      return {
        width: `${host.viewport.width}px`,
        height: `${host.viewport.height}px`
      }
    })
    return () => {
      return (
        <div class={'full-container hello pa-5'}>
          <el-button type="primary" onClick={methods.test}>测试</el-button>
          <el-button type="danger" onClick={methods.consumer}>消费数据</el-button>
          <div class={'red-border'} style={viewportStyle.value}>

          </div>
          <p>
            viewport width = {host.viewport.width}
          </p>
          <p>
            props title = {props.title}
          </p>
          <p>
            abc = {abc}
            <br/>
            age = {age.value}
          </p>
          <div>
            count === {host.count}===
          </div>
          TestEmit
        </div>
      )
    }
  }
})
