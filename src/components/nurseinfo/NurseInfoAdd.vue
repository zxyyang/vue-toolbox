<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/nurseinfoList' }">笔记</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="content">
            <el-form-item label="名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>


            <el-form-item label="笔记内容">
                <el-input
                        type="textarea"
                        :rows="20"
                        placeholder="请输入内容"
                        v-model="form.descibe">
                </el-input>
            </el-form-item>


            <el-form-item label="备注">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.status">
                </el-input>
            </el-form-item>
            <el-form-item label="笔记等级" prop="level">
                <el-select v-model="form.level">
                    <el-option label="一级" value="一级"></el-option>
                    <el-option label="二级" value="二级"></el-option>
                    <el-option label="三级" value="三级"></el-option>
                </el-select>
            </el-form-item>
       <!--     <el-form-item label="是否完成">
                <el-select v-model="form.flag">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>-->
        <!--    <el-form-item label="护理状态">
                <el-select v-model="form.status">
                    <el-option label="开启" value="开启"></el-option>
                    <el-option label="关闭" value="关闭"></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import axios  from 'axios'
    import {HOST} from "../../common/config";
    export default {
        data(){
            return{
                form: {
                    name: '',       //公司名称
                    level: '',  //行业
                    price: '',     //规模
                    descibe: '',     //注册资金
                    status: '',       //联系方式
                    flag: '',   //地址

                },
                rules: { //校验规则
                    name: [
                        { required: true, message: '请输入笔记名称', trigger: 'blur' },
                    ],
                    /*level: [
                        { required: true, message: '请选择等级', trigger: 'change' }
                    ],*/
                }
            }
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) { //校验通过
                        let url = `${HOST}/nurseinfo/add`
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