<template>
    <div class="app">

            <el-container >

                <el-main >
                  <Header></Header>
                  <router-view></router-view>

                </el-main>
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



    .el-main {
      padding: 0 !important;
    }
</style>
