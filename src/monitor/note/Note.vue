<template>
  <div>

    <div style="margin-top: 10px;margin-bottom: 10px">
      <a-space>
        <a-input-search
          v-model:value="value"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
        <a-button @click="$router.push('/addNote')">新建笔记</a-button>
      </a-space>
    </div>
    <div class="tablediv">
      <el-table
        class="table"
        :data="pageInfo.list"
        style="width: 100%"
      >
        <!--        <el-table-column type="expand">-->
        <!--          <template slot-scope="props">-->
        <!--            <el-form label-position="left" inline class="demo-table-expand">-->
        <!--              <el-form-item>-->
        <!--                <span>{{ props.row.noteContent }}</span>-->
        <!--              </el-form-item>-->
        <!--            </el-form>-->
        <!--          </template>-->
        <!--        </el-table-column>-->

        <el-table-column
          prop="noteName"
          label="笔记名称"
          width="180"
        />
        <el-table-column
          prop="noteRemark"
          label="简介"
        />
        <el-table-column
          prop="noteType"
          label="类型"
        />
        <el-table-column
          prop="noteTime"
          label="时间"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showContent(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      笔记内容抽屉-->
      <div>
        <a-drawer
          title="contens"
          :placement="placement"
          :closable="false"
          :visible="visible"
          :data="content"
          @close="onClose"
        >
          <el-table style="width: 100%" class="table1">
            <el-table-column label="内容" align="center">
              <template slot-scope="{ row }">
                <div
                  id="content1"
                  style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              /*height: 34px;*/
              text-align: center;
            "
                  v-html="row.contents"
                />
              </template>
            </el-table-column>
          </el-table>
        </a-drawer>
      </div>
      <!--    分页-->

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float: right;  background-color: #FFFFFF"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <!--      浏览笔记内容-->

      <div v-if="contentVisible" class="popContainer" @click="contentVisible = false">

        <mavon-editor
          v-model="Contentvalue"
          class="md"
          :subfield="false"
          :default-open="'preview'"
          :editable="false"
          :scroll-style="true"
          :ishljs="true"
          :toolbars="toolbars"
          style="height: 96% ;width: 98%;justify-content: center"
        >
          <template #right-toolbar-after>
            <button
              type="button"
              title="关闭"
              class="op-icon fa markdown-upload iconfont iconupload"
              aria-hidden="true"
              @click="closeContent"
            >
              <!-- 这里用的是element-ui给出的图标 -->

              <i class="el-icon-close" />
            </button>
          </template>
        </mavon-editor>

      </div>
    </div>

  </div>

</template>

<script>
import { list } from '@/api/note'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default {

  name: 'Note',
  data() {
    return {
      Contentvalue: {},
      contentVisible: false,
      placement: 'top',
      pageInfo: {
      },
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      toolbars: {

        readmodel: true // 沉浸式阅读

      }

    }
  },
  created() {
    this.Contentvalue = '# 这是一级标题\n' +
        '## 这是二级标题\n' +
        '### 这是三级标题\n' +
        '#### 这是四级标题\n' +
        '##### 这是五级标题\n' +
        '###### 这是六级标题' +
        '**这是加粗的文字**\n' +
        '*这是倾斜的文字*`\n' +
        '***这是斜体加粗的文字***\n' +
        '~~这是加删除线的文字~~' +
        '>这是引用的内容\n' +
        '>>这是引用的内容\n' +
        '>>>>>>>>>>这是引用的内容' +
        '表头|表头|表头\n' +
        '---|:--:|---:\n' +
        '内容|内容|内容\n' +
        '内容|内容|内容\n' +
        '\n' +
        '第二行分割表头和内容。\n' +
        '- 有一个就行，为了对齐，多加了几个\n' +
        '文字默认居左\n' +
        '-两边加：表示文字居中\n' +
        '-右边加：表示文字居右\n' +
        '注：原生的语法两边都要用 | 包起来。此处省略' +
        '(```java  )\n' +
        '  \tif (zoneName.equals("zone0")) {\n' +
        '  } else if (zoneName.equals("zone2")) {' +
        '  private QiNiuConfig() {' +
        '(```)'
  },
  mounted() {
    this.getData()
    // 初始化
    this.getList()
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: true })
  },
  destroyed() {
  },
  methods: {
    // 关闭预览模式
    closeContent() {
      this.contentVisible = false
    },
    // 显示笔记内容
    showContent(row) {
      this.contentVisible = true
    },
    getData() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      list(param).then(res => {
        this.pageInfo = res.data
        this.total = res.data.total
      })
    },
    // 改变页码
    handleSizeChange(val) {
      this.pageSize = val
      this.getData()
    },
    // 分页触发
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getData(val)
    }
  }

}

</script>

<style scoped>
.table{
  background-color: #212121 !important;
}
div.popContainer{
  -webkit-align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(224, 15, 15, 0.3);
}

</style>
