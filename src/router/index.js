import Vue from 'vue'
import VueRouter from 'vue-router'
import admin from '../views/admin/router'
import user from '../views/user/router'
Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home'
    },
      ...admin,
      ...user,
    {
      path: '/mysql',
      name: 'mysql',
      component: () => import( '../views/table/index')
    },
    {
      path: '/goBack',
      component: () => import( '../components/back/goBack')
    },
    {
      path: '*',
      name: '404',
      component: () => import( '../views/404/index')
    }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  /** 修改浏览器标题  */
  // eslint-disable-next-line no-unused-expressions
  to.name ? window.document.title = to.name + '-' + Vue.prototype.$webTitle : ''
  next()
})

export default router
