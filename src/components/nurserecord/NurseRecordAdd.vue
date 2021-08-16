<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/nurserecordList' }">前端任务</el-breadcrumb-item>
            <el-breadcrumb-item>新增</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" class="content">
            <el-form-item label="任务名称" >
                <el-input  type="textarea"
                           :rows="1"
                           placeholder="请输入内容"
                           v-model="form.customername">>

                </el-input>
            </el-form-item>
            <el-form-item label="任务内容">
                <el-input  type="textarea"
                           :rows="20"
                           placeholder="请输入内容"
                           v-model="form.nursingname">>

                </el-input>
            </el-form-item>
            <el-form-item label="开始时间">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="form.time"
                        align="right"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="任务时长">
                <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="任务主体" >
                <el-input  type="textarea"
                           :rows="1"
                           placeholder="请输入内容"
                           v-model="form.staffname">>

                </el-input>
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


    export default {
        data(){
            return{
                selUser: [],
                selPsychosomatics:[],
                selNurseInfo:[],
                selRecord(){
                    this.host = HOST
                    let url = `${HOST}/userinfo/selUser`
                    axios.get(url).then(res=>{
                        this.selUser = res.data
                        console.log(this.selUser)
                    })},
                selCustomer(){
                    this.host = HOST
                    let url = `${HOST}/hosteling/selPsychosomatics`
                    axios.get(url).then(res=>{
                        this.selPsychosomatics = res.data
                        console.log(this.selPsychosomatics)
                    })
                },
                selInfo(){
                    this.host = HOST
                    let url = `${HOST}/nurseinfo/selNurseInfo`
                    axios.get(url).then(res=>{
                        this.selNurseInfo = res.data
                        console.log(this.selNurseInfo)
                    })
                },
                form: {

                    customername: '',       //公司名称
                    nursingname: '',  //行业
                    time: '',     //规模
                    count: '',     //注册资金
                    status: '',       //联系方式
                    staffname: '',   //地址

                },
                rules: { //校验规则
                    customername: [
                        { required: true, message: '请输入客户姓名', trigger: 'blur' },
                    ],
                    staffname: [
                        { required: true, message: '请输入操作人', trigger: 'change' }
                    ],
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
            }
        },

        created(){
            this.selRecord()
            this.selCustomer()
            this.selInfo()
        },

        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) { //校验通过
                        let url = `${HOST}/nurserecord/add`
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