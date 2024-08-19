// import {createApp} from 'vue'
import tmpApp from './App.vue'
import * as Vue from 'vue'
import './style.css'
import './styles/base.css'
import AppContainer from './App.vue'
import {router} from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import TDesign from 'tdesign-vue-next';
// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';
import 'vuetify/styles'
import {createVuetify} from 'vuetify'

const vuetify = createVuetify({})

console.log('---vuetify---');
console.log(vuetify);
// import {createFormily} from "@/components/vue-formily";

// const formily = createFormily();
const app = Vue.createApp(tmpApp)

// app.use(formily, {});
// app.use(TinyVue)
app.use(router)
app.use(ElementPlus)
app.use(vuetify)
app.use(ArcoVue)
app.use(TDesign)


app.mount('#app')
