
<template>

    <div >
        <div class="blackgrond">
          <!--  <span class="title" @click="logout">  Log Out  </span>-->
            <span class="title"> <el-link :underline="false" @click="logout">Log Out</el-link></span>
           <h1 class="logo" style="z-index:20">
 ToThe <br>Moon.
  <svg width="75" height="30" viewBox="0 0 219 20" fill="none" xmlns="http://www.w3.org/2000/svg"  >
    <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#43E229" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
  </svg>
</h1>


        </div>

        <div class="glass">
        <ul class="dock">

            <div class="boxchilde" @mouseenter="flag2 =true" @mouseleave="flag2 = false" @click="closeShow" >
            <div :class="flag2?'passing':''">
                <el-link :underline="false" style="color: #FFFFFF">Index</el-link>
            </div>
            </div>

           <!-- <div class="boxchilde" @mouseenter="flag3 =true" @mouseleave="flag3 = false" @click="showCont">
                <div :class="flag3?'passing':''">
                    <el-link :underline="false" style="color: #FFFFFF">Accommodation</el-link>
                </div>
            </div>-->



            <div class="boxchilde" @mouseenter="flag4 =true" @mouseleave="flag4 = false" @click="showNurse">
            <div :class="flag4?'passing':''">
                <el-link :underline="false" style="color: #FFFFFF">Note-Task</el-link>
            </div>
           </div>

          <!--  <div class="boxchilde" @mouseenter="flag5 =true" @mouseleave="flag5 = false"  @click="showDite">
                <div :class="flag5?'passing':''">
                    <el-link :underline="false" style="color: #FFFFFF">Back-end</el-link>
                </div>
            </div>-->

            <div class="boxchilde" @mouseenter="flag6 =true" @mouseleave="flag6 = false">
                <div :class="flag6?'passing':''">
                    <el-link :underline="false" style="color: #FFFFFF"  @click="userinfo">Upload-Down</el-link>
                </div>
            </div>

        </ul>
        </div>


        <div class="Accommodationmore" v-if="show"  >
            <ul class="index2" >
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="hotelinList">CheckIn</el-link></li>
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="post" >TemporaryGoOut</el-link></li>
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="graduate">CheckOut</el-link></li>
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="bedmanage">BedManagement</el-link></li>


            </ul>
        </div>

        <div class="Dietarymore" v-if="showdietary" >
            <ul class="index2" >

                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="foodmanage">Note</el-link></li>
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="dietarycalendar">Task</el-link></li>

            </ul>
        </div>

        <div class="Nursingmore" v-if="shownurse"  >
            <ul class="index2" >
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="nurseinfo">Note</el-link></li>
                <li style="margin: 20%; text-align: center ">  <el-link :underline="false" @click="nurserecord">Task</el-link></li>

            </ul>
        </div>


   <!--     <div class="Notebook"   >
            <ul class="index2" >
                <li style="text-align: center">本站由SpringBoot+Mybatis+Vue+Mysql数据库完成，项目有导航前端拆解项目、单个功能拆解项目 </li>
                <li style=" text-align: center ">  <el-link :underline="false" href="https://github.com/EIIAUK" style="color: black">点击访问源码>></el-link></li>
            </ul>
        </div>-->

    </div>
</template>



<script>

    export default {
   /*     directives: { Clickoutside },*/

        name: 'Header',
        data () {


            return {
                shownurse:false,
                showdietary:false,
                show:false,
                flag2:false,
                flag3:false,
                flag4:false,
                flag5:false,
                flag6:false,
                indexFlage:false,


            }
        },
        methods:{


            closeShow:function(){
                this.show =false;
                this.shownurse = false;
                this.showdietary = false;
                this.$router.push("/main")
            },
            showCont:function(){
                this.show = true //!this.show ;
                this.shownurse = false;
                this.showdietary = false;

            },
            showNurse:function(){
                this.shownurse = true //!this.shownurse;
                this.show =false;
                this.showdietary = false;
            },

            showDite:function () {
                this.showdietary = true //!this.showdietary;
                this.shownurse = false;
                this.show =false;


            },


            //跳转到护理内容
            nurseinfo(){
                this.$router.push("/nurseinfoList")
            /*    this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/

            },
            //跳转到护理记录
            nurserecord(){
                this.$router.push("/nurserecordList")
              /*  this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到用户信息
            userinfo(){
                this.$router.push("/userinfoList")
               /* this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到住宿管理
            hotelinList(){
                this.$router.push("/hotelinList")
                this.show =false;
                this.shownurse = false;
                this.showdietary = false;
            },
            //住宿增加
            hotelinAdd(){
                this.$router.push("/hotelinAdd")
               /* this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //住宿升级
            hotelinUpdate(){
                this.$router.push("/hotelinUpdate")
              /*  this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/

            },
            //跳转到外出管理
            post(){
                this.$router.push("/hotelegressList")
               /* this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到退住管理
            graduate() {
                this.$router.push("/hoteloutList")
                /*this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到公司管理
            foodmanage(){
                this.$router.push("/foodList")
                /*this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到岗位管理
            dietarycalendar(){
                this.$router.push("/dietaryList")
              /*  this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },
            //跳转到毕业生管理
            bedmanage(){
                this.$router.push("/bedList")
          /*      this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
            },


            //退出
            logout(){
                this.$router.push("/")
               /* this.show =false;
                this.shownurse = false;
                this.showdietary = false;*/
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
        color: white;
        font-size: 20px;
        width: 200px;
        line-height: 1em;
        letter-spacing: -0.03em;
        position: relative;
    }

    h1 svg {
        position: absolute;
        bottom: -10px;
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
    .head{
     /*   margin-bottom: 20px;*/
        font-size: 30px;
        color: #FFFFFF;
        font-style: oblique;
    }
    .title{
        color: #9F9FA1;
        float: right;
        margin-right: 80px;
        margin-top: 15px;
    }
    .blackgrond{
        width: 100%;
        height: 3rem;
        background: #444444;
    }
    .glass {
        width: 100%;
        height: 3rem;
        background: #313132;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        /* border: 2px solid rgba( 255, 255, 255, 0.18 );*/
        display: flex;
        justify-content: center;

    }
    .dock {


        list-style: none;

        display: flex;
        justify-content: center;
        align-items: center;
        color:#FFFFFF;
    }

    .boxchilde{
        display: inline-block;
        margin: 50px;

        border-radius: 5px;
        -webkit-transition: all 0.6s ease-in;
        -moz-transition: all 0.6s ease-in;
        -ms-transition: all 0.6s ease-in;
        -o-transition: all 0.6s ease-in;
        transition: all 0.6s ease-in;
        overflow: hidden;
    }

    .passing {
        width: 100%;
        height: 100%;
        animation: passing_4500 1s ease-in-out 0s 1 alternate forwards;
        transform-origin: 50% 50%;

    }
    @keyframes passing_4500 {
        0% { transform:translateX(-100%); opacity:0 }
        33.33333% { transform:translateX(-100%); opacity:0 }
        66.66667% { transform:translateX(0%); opacity:1 }
        100% { transform:translateX(0%); opacity:1 }
    }
    html {
        font-size: 30px;
    }
    body {
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
        align-items: flex-end;
        background-image: linear-gradient( 109.6deg,  rgba(25,170,209,1) 11.3%, rgba(21,65,249,1) 69.9% );
    }
    .Accommodationmore {
        width: 100%;
        height: 10rem;
        background: #FBFBFD;
      /*  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );*/
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border: 2px solid rgba( 255, 255, 255, 0.18 );
        display: flex;
        justify-content: center;
        color: #000000;
        animation: passing_4500 1s ease-in-out 0s 1 alternate forwards;
        transform-origin: 50% 50%;
    }
    .Nursingmore{
        width: 100%;
        height: 10rem;
        background: #FBFBFD;
      /*  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );*/
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border: 2px solid rgba( 255, 255, 255, 0.18 );
        display: flex;
        justify-content: center;
        color: #000000;
        animation: passing_4500 1s ease-in-out 0s 1 alternate forwards;
        transform-origin: 50% 50%;
    }
    .Dietarymore{
        width: 100%;
        height: 10rem;
        background: #FBFBFD;
       /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );*/
        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border: 2px solid rgba( 255, 255, 255, 0.18 );
        display: flex;
        justify-content: center;
        color: #000000;
        animation: passing_4500 1s ease-in-out 0s 1 alternate forwards;
        transform-origin: 50% 50%;
    }
    .Notebook{
        width: 100%;
        height: 2.5rem;
        background: #0000D7;

        backdrop-filter: blur( 4px );
        -webkit-backdrop-filter: blur( 4px );
        border: 2px solid rgba( 255, 255, 255, 0.18 );
        display: flex;
        justify-content: center;
        color: #FFFFFF;
        animation: passing_4500 1s ease-in-out 0s 1 alternate forwards;
        transform-origin: 50% 50%;

    }
    .index2{


        list-style: none;

        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;

    }
</style>

