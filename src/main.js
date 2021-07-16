import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import instance from './network'
import { store } from './store'
//导入组件库
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
//导入mitt事件总线
import mitt from 'mitt'
const app = createApp(App)
app.config.globalProperties.$axios = instance
app.config.globalProperties.$bus = new mitt()
app.use(router).use(ElementPlus).use(store).mount('#app')
