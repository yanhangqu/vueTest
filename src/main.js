import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

//1.引入Element Plus 核心库
import ElementPlus from 'element-plus'
//2.引入Element Plus的全局CSS样式
import 'element-plus/dist/index.css'

// 引入刚才写好得router
import router from './router'

const app = createApp(App)

//3.告诉Vue使用这个UI框架
app.use(ElementPlus)

// 告诉Vue使用路由模块 （一定要在 mount 之前）
app.use(router)

app.mount('#app')


