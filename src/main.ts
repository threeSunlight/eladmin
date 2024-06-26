
import { createApp } from 'vue'
/**第一步: 引入pinia */
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import  echarts from 'echarts'
/**引入http请求 */
import http from '@/utils/httpRequest'
const app = createApp(App)
// 客户端侧

// 第二步: 注册挂载到app上面
app.use(createPinia())
// app.use(ElementPlus)
app.use(router)
/**将请求挂载到全局 */
app.config.globalProperties.$http = http
app.config.globalProperties.$echarts = echarts

app.mount('#app')
