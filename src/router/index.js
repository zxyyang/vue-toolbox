import Vue from 'vue'
import Router from 'vue-router'
import Portal from '../monitor/portal/Portal'
import Main from '../monitor/main'
import NurseInfoList from '../monitor/note/noteList'
import NurseInfoAdd from '../monitor/note/NoteAdd'
import NurseInfoUpdate from '../monitor/note/noteUpdate'
import NurseRecordList from '../monitor/task/taskList'
import NurseRecordAdd from '../monitor/task/taskAdd'
import NurseRecordUpdate from '../monitor/task/taskUpdate'







Vue.use(Router)
//创建路由对象并配置路由
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode:'history',
    routes: [

        {
            path: '/', redirect :'/index',
            component: Main,
            children: [ /*配置子路由*/
                {
                    path: '/index',
                    component: Portal,
                },

                {
                    path: '/nurseinfoList',
                    component: NurseInfoList,
                },
                {
                    path: '/nurseinfoAdd',
                    component: NurseInfoAdd,
                },
                {
                    path: '/nurseinfoUpdate/:id',
                    component: NurseInfoUpdate,
                },
                {
                    path: '/nurserecordList',
                    component: NurseRecordList,
                },
                {
                    path: '/nurserecordAdd',
                    component: NurseRecordAdd,
                },
                {
                    path: '/nurserecordUpdate/:id',
                    component: NurseRecordUpdate,
                },

            ]
        }

    ]
})


//导出路由对象
export default  router
