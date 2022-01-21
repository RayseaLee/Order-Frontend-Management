/*
 * @Description: 
 * @Author: RayseaLee
 * @Date: 2021-12-07 14:36:20
 * @FilePath: \VScode\vue\vue-order-control\src\router\index.js
 * @LastEditTime: 2022-01-11 15:44:44
 * @LastEditors: RayseaLee
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login')
const Index = () => import('../layout')
const Home = () => import('../views/home')
const User = () => import('../views/user')
const Rights = () => import('../views/power/Rights.vue')
const Role = () => import('../views/power/Role.vue')
const Store = () => import('../views/store')
const Goods = () => import('../views/goods')
const GoodsDetail = () => import('views/goods/list/GoodsDetail.vue')
const AddGoods = () => import('views/goods/list/AddGoods.vue')
const Category = () => import('views/goods/category/Category.vue')
const Params = () => import('views/goods/params/Params.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { 
    path: '/index', 
    component: Index,
    redirect: '/home',
    children: [
      { 
        path: '/home', 
        component: Home,
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
          alias: ['店面管理']
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