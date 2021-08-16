<template>
    <div class="banner">
     <!--   <div class="item">
            <img :src="dataList[currentIndex]">
        </div>
        <div class="page" v-if="this.dataList.length > 1">
            <ul>
                <li @click="gotoPage(prevIndex)">&lt;</li>
                <li v-for=   " (item,index) in dataList" @click="gotoPage(index)" :key='item' :class="{'current':currentIndex == index}">  {{index+1}}</li>
                <li @click="gotoPage(nextIndex)">&gt;</li>
            </ul>
        </div>-->
        <div class="text1">
        <p style="text-align: center;font-size: 50px ; font-family: 'Noto Sans', sans-serif;">如果我们有人忘记了约定,那就在月球相见!</p>
        <p style="text-align: center;font-size: 20px;color: blue ">Let's meet on the moon</p>
    </div>

        <div class="text2">

            <h1 >
                 To The <br>Moon
                <svg width="400" height="70" viewBox="0 0 300 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 35C58.3333 35.8333 145.5 35 203 6.5" stroke="#43E229" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" id="tick" />
                </svg>
            </h1>
        </div>


     <!--   <div style="margin-left: 500px">
            <img src="https://dpic.tiankong.com/gl/bp/QJ8876841567.jpg?x-oss-process=style/794ws" style="size: 50px " >
        </div>-->
        
        <div style="background-color: black">
           </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            gotoPage(index) {
                this.currentIndex = index;
            }
        },

        data: function() {
            return {
               dataList: ["https://www.lifeofpix.com/wp-content/uploads/2017/11/LifeofPix-11-2-1600x1068.jpg","https://www.lifeofpix.com/wp-content/uploads/2017/11/LifeofPix-18-1600x1068.jpg", "https://www.lifeofpix.com/wp-content/uploads/2017/11/LifeofPix-12-1600x1068.jpg",],
                currentIndex: 0,   //默认显示图片
                timer: null    //定时器
            }
        },
        runInv() {
            this.timer = setInterval(() => {
                this.gotoPage(this.nextIndex)
            }, 1000)
        },
        computed: {
            //上一张
            prevIndex() {
                if(this.currentIndex == 0) {
                    return this.dataList.length - 1;
                }else{
                    return this.currentIndex - 1;
                }
            },
            //下一张
            nextIndex() {
                if(this.currentIndex == this.dataList.length - 1) {
                    return 0;
                }else {
                    return this.currentIndex + 1;
                }
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
        font-size: 80px;
        width: 230px;
        line-height: 1em;
        letter-spacing: -0.05em;
        position: relative;
    }

    h1 svg {
        position: absolute;
        bottom: -20px;
        left: -20px;
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
.banner{
    width: 100%;
    white-space:nowrap;
}
    .text1{
        margin-top: 80px;
        white-space:nowrap;
    }
    .text2{
        display: flex;
        justify-content: center;
        align-items: center;

    }

</style>