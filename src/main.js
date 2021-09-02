import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
// markdown
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(Antd)
Vue.use(ElementUI)
// 白名单，有些页需要拦截，有些页不需要拦截
const whites = ['/login', '/index']

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')// 取出token
  console.log('token======' + token)
  console.log('我是 router过滤器')
  // 用to的地址来匹配白名单
  for (let i = 0; i < whites.length; i++) {
    if (to.fullPath === whites[i]) {
      next()
      return
    }
  }
  // 判断当前的token是否存在
  if (token) {
    // 如果不在白名单里，但是token存在的话，证明已经登录，也可以进行页面跳转
    next()
  } else {
    console.log('转跳')
    // 否则，就直接跳回登陆页
    next('/login')
  }
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  render: h => h(App)
}).$mount('#app')

