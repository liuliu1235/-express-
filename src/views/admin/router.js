
import index from './index/index'
import login from './login/login'
import admin from './admin/index'
import home from './home/index'

let routes=[
    {
        path:'/admin-index',
        name:'index',
        component:index,
        children:[
            {
                path:'/admin-home',
                name:'管理员首页',
                component:home,
            },
            {
                path:'/admin-admin',
                name:'管理员管理',
                component:admin,
            },
            {
                path:'/admin-carousel',
                name:'轮播图管理',
                component: () => import( './carousel/index'),
            },
            {
                path:'/admin-info',
                name:'管理员资料',
                component: () => import( './admin/info'),
            },
            {
              path:'/admin-news',
              name:'新闻管理',
              component: () => import( './news/index'),
            },
            {
                path:'/admin-speak',
                name:'留言管理',
                component: () => import( './speak/index'),
            },
            {
                path:'/admin-sort',
                name:'分类管理',
                component: () => import( './sort/index'),
            },
            {
              path:'/admin-user',
              name:'用户管理',
              component: () => import( './user/index'),
            },
            {
              path:'/admin-mysql',
              name:'数据库管理',
              component: () => import( '../table/index'),
            },

            {
                path: '/admin-404',
                name: 'admin404',
                component: () => import( '../404/index')
            }
        ]
    },
    {
        path:'/admin-login',
        name:'login',
        component:login,
    },
    {
        path: '/admin-*',
        redirect:'/admin-404'
    }
]

let ROUTES=routes

export default ROUTES
