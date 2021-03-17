import Vue from 'vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

import component from './components/index'
Vue.use(component)

import overAll from './assets/overAll/index'
Vue.use(overAll)

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$webTitle='新冠肺炎预防网站';  /**页面标题*/

import App from './App.vue'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
