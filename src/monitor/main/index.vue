<template>
    <div id="app">
        <el-container>
            <el-container>

                <!--<el-header><Header/></el-header>-->
                <el-main>
                  <Header></Header>
                    <div class="men">
                        <router-view>
                        </router-view>

                    </div>

                </el-main>
            </el-container>

        </el-container>

    </div>
</template>

<script>

    import Header from "@/monitor/header/Header";

    export default {
        components:{

          Header,

        }
    }
</script>

<style>
    /** 清除内外边距 **/
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, /* structural elements 结构元素 */
    dl, dt, dd, ul, ol, li, /* list elements 列表元素 */
    pre, /* text formatting elements 文本格式元素 */
    form, fieldset, legend, button, input, textarea, /* form elements 表单元素 */
    th, td /* table elements 表格元素 */
    {
        margin: 0;
        padding: 0;
    }

    .el-container {
       height: 100vh;
        min-height: 600px;
    }


    .el-aside{
       /* width: 220px !important;*/
        height: 100%;
        background-color: #545c64;
    }

    .el-main{
        padding: 10px !important;

        width: auto;
    }
    .men{
        margin-left: 20px;
        margin-top: 20px;
        margin-right: 20px;
    }
</style>
