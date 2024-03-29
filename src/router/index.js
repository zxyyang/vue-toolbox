import Vue from 'vue'
import Router from 'vue-router'
import Portal from '../monitor/portal/Portal'
import Main from '../monitor/main'
import Note from '../monitor/note/Note'
import Task from '../monitor/video/Video'
import Login from '@/monitor/login/Login'
import CloudDisk from '@/monitor/cloudDisk/CloudDisk'
import AddNote from '@/monitor/note/AddNote'
import UpdateNote from '@/monitor/note/UpdateNote'
import WxMain from '@/monitor/Weixin/WxMain'
import AddRemind from '@/monitor/Weixin/AddRemind'
import WxRouter from '@/monitor/Weixin/WxRouter'
import Todo from '@/monitor/todoList/todo'
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
          path: 'addNote',
          component: AddNote
        },
        {
          path: 'updateNote',
          component: UpdateNote
        },
        {
          path: 'index',
          component: Portal
        },
        {
          path: 'note',
          component: Note
        },
        {
          path: 'video',
          component: Task
        },
        {
          path: 'cloudDisk',
          component: CloudDisk
        },
        {
          path: '/wx', redirect: 'wxRemind',
          component: WxRouter,
          children: [
            {
              path: 'addRemind',
              component: AddRemind
            }
          ]
        },
        {
          path: 'wxRemind',
          component: WxMain
        },
        {
          path: 'todo',
          component: Todo
        }

      ]
    }
  ]
})

// 导出路由对象
export default router
