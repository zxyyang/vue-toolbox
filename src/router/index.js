import Vue from 'vue'
import Router from 'vue-router'
import Portal from '../monitor/portal/Portal'
import Main from '../monitor/main'
import Note from '../monitor/note/Note'
import Task from '../monitor/task/Task'
import Login from '@/monitor/login/Login'

Vue.use(Router)
// 创建路由对象并配置路由
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },

    {
      path: '/', redirect: '/index',
      component: Main,
      children: [ /* 配置子路由*/
        {
          path: '/index',
          component: Portal
        },
        {
          path: '/note',
          component: Note
        },
        {
          path: '/task',
          component: Task
        }

      ]
    }

  ]
})

// 导出路由对象
export default router
