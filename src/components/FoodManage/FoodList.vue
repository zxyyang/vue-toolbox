<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>后端笔记</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="笔记名称">
                <el-input v-model="form.customName"></el-input>
            </el-form-item>
            <el-form-item label="笔记等级">
                <el-select v-model="form.foodWeek">
                    <el-option label="--请选择--" value=""></el-option>
                    <el-option label="一级" value="1"></el-option>
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
                            <span>{{ props.row.foodName}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    type="index"
                    width="100">
            </el-table-column>
        <!--    <el-table-column
                    label="创建时间"
                    width="150">
                <template slot-scope="scope">
                    {{ convert(scope.row.createDate) }}
                </template>
            </el-table-column>-->
            <el-table-column
                    prop="customName"
                    label="笔记名称"
                    width="250">
            </el-table-column>


            <el-table-column
                    prop="foodWeek"
                    label="笔记等级"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="foodDate"
                    label="备注"
                    width="450">
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
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from "../../common/config";
    import {makeSimpleDate} from "../../common/dateformat";

    export default {
        data(){
            return{
                currPage: 1, //当前页
                form: {
                    customName: '',
                    foodWeek:''

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
                let url = `${HOST}/foodmanage/query/${this.currPage}`
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
                this.$router.push("/foodAdd")
            },
            //跳转到修改界面
            handleEdit(id){
                this.$router.push(`/foodUpdate/${id}`)
            },
            //删除
            handleDelete(id){
                let url = `${HOST}/foodmanage/del/${id}`
                axios.get(url).then(res=>{
                    if(res.data.state === 200){
                        this.$message.success("删除成功")
                        //重新加载数据
                        this.currPage = 1
                        this.getData()
                    }
                })
            },
            //日期格式转换
            convert(date){
                return makeSimpleDate(date)
            }

        }
    }
</script>

<style scoped>
    .demo-form-inline {
        margin-top: 10px;
    }
</style>