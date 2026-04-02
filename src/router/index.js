import { createRouter,createWebHistory } from "vue-router";

//引入页面组件
import Home from '../views/Home.vue'
import User from '../views/User.vue'

//定义规则路由表
const routes = [
    {
        path:'/',
        redirect:'/home'  //默认重定向到首页
    },
    {
        path:'/home',
        name:'Home',
        component:Home
    },
    {
        path:'/users',
        name:'User',
        component:User  // 访问/users时，加载那个带表格得组件
    }
]

//创建路由实例
const router = createRouter({
    // 使用HTML5的历史记录模式（地址栏没有丑陋的 # 号）
    history: createWebHistory(),
    routes
})

export default router