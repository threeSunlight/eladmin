import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/common/Dashboard.vue'
import Login from '../views/common/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/User.vue')
  }
]

/**
 * 在v3中实现动态路由
 * 动态路由: 
 *    静态路由
 *    动态路由
 * 
 * 第一步: 配置静态路由
 *      1. 无需以侧边栏为入口,配置全局无需权限的公共路由
 *          登录,404,401
 *      2. 以侧边栏为入口的静态路由,首页
 *          单独设置一个对象,因为后续,请求完动态路由后,需要把首页放在数组的第一位
 *      3. 创建以侧边栏为入口主入口静态路由
 *          创建一个路由独享守卫,如果有token,就使用next()放行,如果没有token就重新跳转到登录页面
 * 
 * 
 *      4. 实例化路由,将两个静态路由进行合并注册
 * 
 * 第二步: 请求动态路由接口
 *      1. 全局前置路由守卫
 *          请求接口,获取获取最终的数据,因为后端已经帮我们处理好了数据,不需要我们再次进行处理,所以直接请求成功后,
 *          需要循环调用router.addRoute('main', item)添加到已有的路由路径
 *         
 * 
 * 第三步: 按钮的显隐控制
 *       调用info接口,获取roles中的权限标识,
 *       如果返回的是admin,函数返回是true,
 *       如果不是admin,表示不是超级管理员,需要进行进行权限判断标识
 * 
 */


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})



export default router
