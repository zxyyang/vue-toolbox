<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="New "
      sub-title=" Enter notes"
      @back=" $router.push('/note')"
    >
      <template slot="extra">
        <a-input v-model="noteName" placeholder="Name" style="width: 200px" />
        <a-input v-model="noteRemark" placeholder="Remark" style="width: 200px" />
      </template>
      <template slot="extra">
        <a-button @click="addNote">
          Submit
        </a-button>
      </template>
    </a-page-header>
    <mavon-editor
      ref="md"
      v-model="value"
      :toolbars="toolbars"
      :code-style="'github-dark-dimmed'"
      style="height: 730px"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
      @change="change"
    />
  </div>
</template>

<script>
import { add, uploadFiles, deleteFiles } from '@/api/note'

export default {
  name: 'AddNote',
  data() {
    return {
      noteName: '',
      noteRemark: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    // 提交数据
    addNote() {
      const param = {
        noteName: this.noteName,
        noteRemark: this.noteRemark,
        noteContent: this.value
      }

      console.log(param)
      add(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$router.push('/note')
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 监听markdown变化
    change(value, render) {
      this.html = render
      // this.blogInfo.blogMdContent = value
      // this.blogInfo.blogContent = render
    },
    // 上传图片接口pos 表示第几个图片
    async  handleEditorImgAdd(pos, $file) {
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFiles(formdata).then(res => {
        var url = res.data
        this.$refs.md.$imglst2Url([[pos, url]])
      })
    },
    async  handleEditorImgDel(pos) {
      const param = {
        // 取得URL地址
        url: pos[0]
      }
      deleteFiles(param).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>

/*github使用的是这个   根据自己的进行调整*/
/*.markdown-body {*/
/*  height: 3000px;*/
/*  box-sizing: border-box;*/
/*  min-width: 200px;*/
/*   max-width: 980px;*/
/*   padding: 45px;*/
/*  max-width: 98%;*/
/*  margin: 0 auto;*/
/*  box-shadow: 2px 4px 6px gray;*/
/*  padding-left: 20px;*/
/*  padding-right: 15px;*/
/*  padding-top: 40px;*/
/*  padding-bottom: 45px;*/
/*  margin-bottom: 100px*/
/*}*/

/*//这个要配合移动端 不是很理解*/
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
