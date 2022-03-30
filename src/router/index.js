// 引入Vue|Vue-router
import Vue from 'vue'
import Router from 'vue-router'

// 使用路由插件
Vue.use(Router)

/* 引入最外层骨架的一级路由组件*/
import Layout from '@/layout'

// 路由的配置：为什么不同用户登录我们的项目，菜单（路由）都是一样的？
// 因为咱们的路由‘死的’，不管你是谁，你能看见的，操作的菜单都是一样的
// 需要把项目中的路由进行拆分

// 常量路由:就是不关用户是什么角色，都可以看见的路由
// 什么角色（超级管理员，普通员工）：登录、404、首页
export const constantRoutes = [
  // 登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404路由
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 首页路由，重定向
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

// 异步理由
export const asyncRoutes = [
  // 权限管理路由
  {
    name: 'Acl',
    path: '/acl',
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '权限管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        name: 'User',
        path: 'user/list',
        component: () => import('@/views/acl/user/list'),
        meta: {
          title: '用户管理'
        }
      },
      {
        name: 'Role',
        path: 'role/list',
        component: () => import('@/views/acl/role/list'),
        meta: {
          title: '角色管理'
        }
      },
      {
        name: 'RoleAuth',
        path: 'role/auth/:id',
        component: () => import('@/views/acl/role/roleAuth'),
        meta: {
          activeMenu: '/acl/role/list',
          title: '角色授权'
        },
        hidden: true
      },
      {
        name: 'Permission',
        path: 'permission/list',
        component: () => import('@/views/acl/permission/list'),
        meta: {
          title: '菜单管理'
        }
      }
    ]
  },
  // 商品管理路由
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: { title: '商品管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'trademark',
        name: 'TradeMark',
        component: () => import('@/views/product/tradeMark'),
        meta: { title: '品牌管理' }
      },
      {
        path: 'attr',
        name: 'Attr',
        component: () => import('@/views/product/Attr'),
        meta: { title: '平台属性管理' }
      },
      {
        path: 'spu',
        name: 'Spu',
        component: () => import('@/views/product/Spu'),
        meta: { title: 'Spu管理' }
      },
      {
        path: 'sku',
        name: 'Sku',
        component: () => import('@/views/product/Sku'),
        meta: { title: 'Sku管理' }
      }
    ]
  },
  // 测试
  {
    path: '/test',
    component: Layout,
    name: 'Test',
    meta: { title: '测试管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('@/views/Test/Test1'),
        meta: { title: '测试管理1' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('@/views/Test/Test2'),
        meta: { title: '测试管理2' }
      }
    ]
  }
]

// 任意路由：当路径出现错误的时候重定向404
export const anyRoutes = { path: '*', redirect: '/404', hidden: true }

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
