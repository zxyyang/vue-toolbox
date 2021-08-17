<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/nurseinfoList' }">笔记</el-breadcrumb-item>

        </el-breadcrumb>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="笔记名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>



            <el-form-item label="笔记等级">
                <el-select v-model="form.level">
                    <el-option label="--请选择--" value=""></el-option>
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                    <el-option label="三级" value="三级"></el-option>
                </el-select>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <span>{{ props.row.descibe}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="笔记名称"
                    width="250">
            </el-table-column>




            <el-table-column
                    prop="level"
                    label="重要等级"
                    width="120">
            </el-table-column>
           <!-- <el-table-column
                    prop="price"
                    label="护理价格（元）"
                    width="120">
            </el-table-column>-->
            <el-table-column
                    prop="status"
                    label="备注"
                    width="450">
            </el-table-column>
           <!-- <el-table-column
                    prop="flag"
                    label="是否增值"
                    width="100">
            </el-table-column>-->
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
    </div>
</template>

<script>
    import axios  from 'axios'
    import {HOST} from "../../common/config";
    export default {
        data(){
            return{
                currPage: 1, //当前页
                form: {
                    name: '',
                    nursing_level: ''
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
                let url = `${HOST}/note/list`
                axios.post(url,this.form).then(res=>{
                    console.log(res.data)
                    this.pageInfo = res.data
                })
            },
            //当前页改变时触发
            handleCurrentChange(val) {
                //赋值需要跳转的页码
                this.currPage = val
                //重新加载数据
                this.getData()
            },
            //跳转到新增界面
            handleAdd(){
                this.$router.push("/nurseinfoAdd")
            },
            //跳转到修改界面
            handleEdit(id){
                this.$router.push(`/nurseinfoUpdate/${id}`)
            },
            //删除
            handleDelete(id){
                let url = `${HOST}/nurseinfo/del/${id}`
                axios.get(url).then(res=>{
                    if(res.data.state === 200){
                        this.$message.success("删除成功")
                        //重新加载数据
                        this.currPage = 1
                        this.getData()
                    }
                })
            },


        }
    }
</script>

<style scoped>

</style>
