<template>
    <div >

        <iframe width="100%" height="800px" src="http://zxyang.cn:8000/"  frameborder="0"  > </iframe>



        <iframe width="100%" height="800px" src="http://baidu.com/"  frameborder="0"  > </iframe>
    </div>
    <!--<div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>员工信息</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="员工姓名">
                <el-input v-model="form.staffname"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onQuery">查询</el-button>
                <el-button type="primary" icon="el-icon-edit" circle @click="handleAdd"></el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="pageInfo.list"
                border
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="员工ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="staffname"
                    label="员工姓名"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="staffsex"
                    label="员工性别"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phonenumber"
                    label="员工电话"
                    width="250">
            </el-table-column>
            <el-table-column
                    prop="stafftype"
                    label="员工类别"
                    width="200">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="info"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="pageInfo.pageSize"
                :total="pageInfo.total">
        </el-pagination>
    </div>-->
</template>

<script>

    import axios  from 'axios'
    import {File} from "../../common/config";
  //  import ElBreadcrumbItem from "element-ui/packages/breadcrumb/src/breadcrumb-item";
 /*   import {makeSimpleDate} from "../../common/dateformat";*/


    export default {
       // name: "UserInfoList",
        data(){
            return{
                currPage: 1, //当前页
                form: {
                    staffname: '',

                },
                pageInfo: {

                }
            }
        },
        created(){
            //取需要显示的数据
            this.getData()
        },
        methods: {
            onQuery(){
                this.currPage = 1
                this.getData()
            },
            //获取数据
            getData(){
                let url = `${File}`
                axios.post(url,this.form).then(res=>{
                    console.log(res.data)
                    this.pageInfo = res.data
                })
            },
       /*     //当前页改变时触发
            handleCurrentChange(val) {
                //赋值需要跳转的页码
                this.currPage = val
                //重新加载数据
                this.getData()
            },
            //跳转到新增界面
            handleAdd(){
                this.$router.push("/userinfoAdd")
            },
            //跳转到修改界面
            handleEdit(id){
                this.$router.push(`/userinfoUpdate/${id}`)
            },*/
            //删除
        /*    handleDelete(id){
                let url = `${HOST}/userinfo/del/${id}`
                axios.get(url).then(res=>{
                    if(res.data.state === 200){
                        this.$message.success("删除成功")
                        //重新加载数据
                        this.currPage = 1
                        this.getData()
                    }
                })
            },*/
         /*   //日期格式转换
            convert(date){
                return makeSimpleDate(date)
            }*/

        }
    }

</script>


<style scoped>

</style>