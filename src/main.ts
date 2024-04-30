import './assets/main.css'

import { createApp } from 'vue'
/**第一步: 引入pinia */
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
/**引入http请求 */
import http from '@/utils/httpRequest'
const app = createApp(App)
// 客户端侧
console.log(' import.meta.env.MODE: ',  import.meta.env);
// 第二步: 注册挂载到app上面
app.use(createPinia())
// app.use(ElementPlus)
app.use(router)
/**将请求挂载到全局 */
app.config.globalProperties.$http = http
app.mount('#app')
