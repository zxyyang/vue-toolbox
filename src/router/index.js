import Vue from 'vue'
import Router from 'vue-router'
import Portal from '../components/portal/Portal'
import Main from '../components/main/Main'
import UserInfoList from  '../components/userinfo/UserInfoList'
import NurseInfoList from '../components/nurseinfo/NurseInfoList'
import NurseInfoAdd from '../components/nurseinfo/NurseInfoAdd'
import NurseInfoUpdate from '../components/nurseinfo/NurseInfoUpdate'
import NurseRecordList from '../components/nurserecord/NurseRecordList'
import NurseRecordAdd from '../components/nurserecord/NurseRecordAdd'
import NurseRecordUpdate from '../components/nurserecord/NurseRecordUpdate'
import UserInfoAdd from '../components/userinfo/UserInfoAdd'
import UserInfoUpdate from '../components/userinfo/UserInfoUpdate'
import FoodList from "../components/FoodManage/FoodList";
import FoodAdd from "../components/FoodManage/FoodAdd";
import FoodUpdate from "../components/FoodManage/FoodUpdate";






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
            path: '/',
            component: Main,
            children: [ /*配置子路由*/
                {
                    path: '/Portal',
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

                {
                    path: '/userinfoList',
                    component: UserInfoList,
                },
                {
                    path: '/userinfoAdd',
                    component: UserInfoAdd,
                },
                {
                    path: '/userinfoUpdate/:id',
                    component: UserInfoUpdate,
                },

                {
                    path: '/foodList',
                    component: FoodList,
                },
                {
                    path:'/foodAdd',
                    component: FoodAdd,
                },
                {
                    path: '/foodUpdate/:id',
                    component: FoodUpdate,
                },


            ]
        }

    ]
})


//导出路由对象
export default  router
