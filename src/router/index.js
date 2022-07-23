/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-07 14:36:20
 * @FilePath: \vue-order-control\src\router\index.js
 * @LastEditTime: 2022-05-13 15:19:00
 * @LastEditors: RayseaLee
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login')
const Index = () => import('../layout')
const Dashboard = () => import('../views/dashboard')
const User = () => import('../views/user')
const Rights = () => import('../views/power/Rights.vue')
const Role = () => import('../views/power/Role.vue')
const Store = () => import('../views/store/storefront')
const Goods = () => import('../views/goods')
const GoodsDetail = () => import('views/goods/list/GoodsDetail.vue')
const AddGoods = () => import('views/goods/list/AddGoods.vue')
const Category = () => import('views/goods/category/Category.vue')
const Params = () => import('views/goods/params/Params.vue')
const Swipers = () => import('views/store/swipers')
const Tables = () => import('views/store/tables')
const Order = () => import('views/order/Order.vue')
const Evaluation = () => import('views/order/Evaluation.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/index', 
    component: Index,
    redirect: '/dashboard',
    children: [
      { 
        path: '/dashboard', 
        component: Dashboard,
        meta: {
          alias: '首页'
        },
      },
      { 
        path: '/users', 
        component: User,
        meta: {
          alias: ['用户管理', '用户列表']
        }
      },
      { 
        path: '/rights', 
        component: Rights,
        meta: {
          alias: ['权限管理', '权限列表']
        }
      },
      { 
        path: '/roles', 
        component: Role,
        meta: {
          alias: ['权限管理', '角色列表']
        }
      },
      {
        path: '/storefront',
        component: Store,
        meta: {
          alias: ['店铺管理', '店面管理']
        }
      },
      {
        path: '/goods',
        component: Goods,
        meta: {
          alias: ['商品管理', '商品列表']
        }
      },
      {
        path: '/goods/detail',
        component: GoodsDetail
      },
      {
        path: '/goods/add',
        component: AddGoods
      },
      {
        path: '/categories',
        component: Category,
        meta: {
          alias: ['商品管理', '商品分类']
        }
      },
      {
        path: '/params',
        component: Params,
        meta: {
          alias: ['商品管理', '动态参数']
        }
      }, 
      {
        path: '/swipers',
        component: Swipers,
        meta: {
          alias: ['店铺管理', '轮播图管理']
        }
      },
      {
        path: '/tables',
        component: Tables,
        meta: {
          alias: ['餐桌管理', '餐桌信息']
        }
      },
      {
        path: '/orders',
        component: Order,
        meta: {
          alias: ['订单管理', '订单列表']
        }
      },
      {
        path: '/evaluations',
        component: Evaluation,
        meta: {
          alias: ['订单管理', '订单评价']
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login')
    return next()
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) {
    alert('请先登录')
    return next('/login')
  }
  next()
})

export default router