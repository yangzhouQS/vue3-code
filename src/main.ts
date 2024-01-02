// import {createApp} from 'vue'
import * as Vue from 'vue'
import './style.css'
import './styles/base.css'
import AppContainer from './App.vue'
import {router} from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import {createFormily} from "@/components/vue-formily";
// import TinyVue from '@opentiny/vue';
/*window.Vue = {
  ...Vue,
  resolveComponent(...args) {
    // 此处先执行vue内部的解析组件的方法，如果可以拿到组件对象则直接返回，反之则去注册区块
    const component = Vue.resolveComponent(args[0])
    /!*if (component && typeof component === 'string') {
      return getComponent(capitalize(camelize(args[0])))
    } else {
      return component
    }*!/
    console.log(component);
    debugger;
    return component
  },
  // renderSlot方法第三个参数是作用域插槽传递的数据，格式{ data: vue.unref(state).componentData }
  renderSlot(...args) {
    // 获取当前vue的实例
    const instance = Vue.getCurrentInstance()
    console.log('hello instance');
    console.log(args);
    return Vue.renderSlot(...args)
  }
}*/

let App = null
function create() {
  App && App.unmount()
  App = null
  // document.body.remove()
  // document.body = document.createElement('body')

  let appContainer = document.querySelector('#app')
  if (!appContainer){
    appContainer = document.createElement('div');
    appContainer.setAttribute('id', 'app');
    document.body.appendChild(appContainer);
  }

  App = Vue.createApp(AppContainer)
    // .use(formily, {})
    .use(router)
    .use(ElementPlus);

  // 挂载
  App.mount(document.querySelector('#app'))

  App.config.errorHandler = () => {}
}

console.log(window);

create()
/*const formily = createFormily();
const app = Vue.createApp(App)

app.use(formily, {});
// app.use(TinyVue)
app.use(router)
app.use(ElementPlus)
app.mount('#app')*/
