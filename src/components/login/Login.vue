<template>
    <div class="all">

        <div class="wrap" >
            <el-row type="flex"  justify="center">
                <el-col :span="6"></el-col>
                <el-col :span="6">
                    <div class="head" style=" display: flex;justify-content: center;align-items: center;">
                        <h1>
                            To The Moon
                            <svg width="200" height="36" viewBox="0 0 200 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#43E229" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
                            </svg>
                        </h1>
                    </div>
                    <div  class="border">
                        <el-form   ref="form" :model="form" class="login" label-width="100px">
                            <el-form-item
                                    label="UserName:" class="text1" style="text-align: left;margin-left: 60px;font-color: #FFFFFF">
                                <el-input
                                        placeholder="Please input UserName"
                                        v-model="form.username"
                                        clearable style="width: 70%">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Password:" style="text-align: left;margin-left: 60px;color: #FFFFFF">
                                <el-input
                                        style="width: 70%;"
                                        placeholder="please input password"
                                        v-model="form.password"
                                        show-password>
                                </el-input>
                            </el-form-item>

                            <div style="text-align:center">
                                <el-button class="but1" @click="onSubmit" style="margin-right: 0px">LogIn</el-button>

                            </div>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="6"><div ></div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {HOST} from '../../common/config'
    export default {
        data(){

            return{
                input: '',

                backgroundDiv: {

                    backgroundImage:'url(https://www.lifeofpix.com/wp-content/uploads/2014/05/Life-of-pix-window-Sarah-babineau-1600x1030.jpg)',

                    backgroundRepeat:'no-repeat',

                    backgroundSize:'100% 130%',

                },
                form: {
                    username: '',
                    password: '',
                    label:''
                }
            }
        },
        created(){
            //取需要显示的数据
            this.getData()
        },
        methods:{
            handleClick() {
                alert('button click');
            },

            onSubmit(){
                let url = `${HOST}/user/login`
                axios.post(url,this.form).then(res=>{
                    let response = res.data
                    console.log(res.data)
                    switch(response.msg){
                        case '0': //登录成功
                            this.$router.push('/main')
                            break;
                        case '1': //密码错误
                            this.$message.error('密码错误!')
                            break;
                        case '2'://用户名错误
                            this.$message.error("用户名错误")
                            break;

                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap');

    body {
        font-family: 'Noto Sans', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    h1 {
        font-size: 30px;
        width: 220px;
        line-height: 1em;
        letter-spacing: -0.03em;
        position: relative;
    }

    h1 svg {
        position: absolute;
        bottom: -5px;
        left: 0px;
        z-index: -1;
    }

    #tick {
        stroke-dasharray: 210px;
        stroke-dashoffset: 210px;
        animation: 3s tick ease-in-out infinite;
    }

    @keyframes tick {
        0%, 50% {
            stroke-dashoffset: 210px;
        }
        50%, 100% {
            stroke-dashoffset: 0px;
        }
    }
    div{
        white-space:nowrap;
    }
    .border{
        size:50px;
        background-color: #313132;
        border-radius: 15px;
        /* box-shadow: 10px 10px 30px rgba(0, 0, 0, 100), 0 0 6px rgba(255, 255, 255, .100);*/
        /*  box-shadow: 10px 10px 60px #C944FF,-30px -30px 60px #F93979;*/
        white-space:nowrap;
    }
    .text1{
        padding-top: 30px;
        white-space:nowrap;


    }

    .wrap {
        margin-top: 250px;
        white-space:nowrap;
    }

    .wrap h1 {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 25px;
        color: #292421;
        background-color: rgba(255,255,255,0);
        white-space:nowrap;
        /*background-image: linear-gradient(120deg, #BDFCC9 0%, #8fd3f4 100%);*/
    }
    .but1{
        margin-bottom: 20px;
        white-space:nowrap;

    }
    .wrap .login {
        margin-top: 30px;
        white-space:nowrap;

    }
    div{
        white-space:nowrap;
    }

</style>