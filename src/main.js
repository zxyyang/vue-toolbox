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
Vue.use(ElementUI)
Vue.use(Antd)
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  render: h => h(App)
}).$mount('#app')

