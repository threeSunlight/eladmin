import './assets/main.css'

import { createApp } from 'vue'
/**第一步: 引入pinia */
import { createPinia } from 'pinia'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// 客户端侧
console.log(' import.meta.env.MODE: ',  import.meta.env);
// 第二步: 注册挂载到app上面
app.use(createPinia())
// app.use(ElementPlus)
app.use(router)

app.mount('#app')
