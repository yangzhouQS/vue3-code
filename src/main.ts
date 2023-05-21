import {createApp} from 'vue'
import './style.css'
import './styles/base.css'
import App from './App.vue'
import {router} from "./router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {createFormily} from "@/components/vue-formily";

const formily = createFormily();
const app = createApp(App)
app.use(formily, {})
app.use(router)
app.use(ElementPlus)
app.mount('#app')
