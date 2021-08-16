<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/userinfoList' }">员工信息</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="content">
            <el-form-item label="员工姓名" prop="staffname">
                <el-input v-model="form.staffname"></el-input>
            </el-form-item>
            <el-form-item label="员工性别">
                <el-select v-model="form.staffsex" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                    <el-option label="不限" value="不限"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工年龄">
                <el-input v-model="form.staffage"></el-input>
            </el-form-item>
            <el-form-item label="员工类别" prop="stafftype">
                <el-select v-model="form.stafftype" placeholder="请选择类别">
                    <el-option label="医生" value="医生"></el-option>
                    <el-option label="护工" value="护工"></el-option>
                    <el-option label="管理员" value="管理员"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="员工电话">
                <el-input  v-model="form.phonenumber"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>


    import axios  from 'axios'
    import {HOST} from "../../common/config";
   //   import ElBreadcrumbItem from "element-ui/packages/breadcrumb/src/breadcrumb-item";
   // import {makeSimpleDate} from "../../common/dateformat";

    export default {
        data(){
            return{
                form: {
                    staffname: '',
                    staffsex: '',
                    staffage: '',
                    stafftype: '',
                    status: '',
                    phonenumber: '',
                },
                rules: { //校验规则
                    staffname: [
                        { required: true, message: '请输入员工姓名', trigger: 'blur' },
                    ],
                    stafftype: [
                        { required: true, message: '请输入员工类别', trigger: 'blur' },
                    ],

                }
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) { //校验通过
                        let url = `${HOST}/userinfo/add`
                        axios.post(url,this.form).then(res=>{
                            if(res.data.state === 200){//成功
                                this.$message.success("添加成功")
                            }
                        })
                    }
                })
            }


        }
    }
</script>

<style scoped>
    .content {
        margin-top: 10px;
    }
</style>