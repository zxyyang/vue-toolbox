<template>
  <div>

    <div style="margin-top: 10px;margin-bottom: 10px">
      <a-space style="margin-left: 20px">
        <a-input-search
          v-model:value="searchValue"
          placeholder="input search text"
          style="width: 200px"
          @search="onSearch"
        />
        <a-button @click="$router.push('/addNote')">新建笔记</a-button>
        <a-button type="danger" @click="batchDelet">删除</a-button>
      </a-space>
    </div>
    <div class="tablediv">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        class="table"
        :align="center"
        :data="pageInfo.list"
        style="width: 100%; "
        :default-sort="{prop: 'date', order: 'descending'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="140"
          align="center"
        />
        <el-table-column
          prop="noteName"
          label="笔记名称"
        />
        <el-table-column
          prop="noteRemark"
          label="备注"
        />

        <el-table-column
          prop="noteType"
          label="类型"
          width="250"
          align="center"
        />
        <el-table-column
          sortable
          prop="noteTime"
          label="时间"
          width="300"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showContent(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="editeContent(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

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

      <div v-if="contentVisible" class="popContainer">
        <mavon-editor
          v-model="ContentValue"
          v-loading="loading"
          class="md"
          :subfield="false"
          :default-open="'preview'"
          :editable="false"
          :scroll-style="true"
          :ishljs="true"
          :toolbars="toolbars"
          style="height: 96% ;width: 98%;justify-content: center ; "
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
import { list, getContent, selectByName } from '@/api/note'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default {

  name: 'Note',
  data() {
    return {
      searchValue: '',
      ContentValue: '',
      loading: false,
      contentVisible: false,
      placement: 'top',
      pageInfo: {
      },
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      toolbars: {
        navigation: true,
        readmodel: true // 沉浸式阅读

      }

    }
  },
  created() {
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
    // 搜索
    onSearch() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        noteName: this.searchValue
      }

      selectByName(param).then(res => {
        if (res.code === 200) {
          this.pageInfo = res.data
          this.total = res.data.total
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    formatter(row, column) {
      return row.address
    },
    // 关闭预览模式
    closeContent() {
      this.contentVisible = false
      this.ContentValue = ''
    },
    // 显示编辑笔记
    editeContent(row) {
      this.$router.push({ path: '/updateNote',
        query: {
          id: row.id
        }
      })
    },
    // 显示笔记内容
    showContent(row) {
      this.contentVisible = true
      this.loading = true
      getContent(row.id).then(res => {
        this.ContentValue = res.data.noteContent
        this.loading = false
      })
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
  background: rgba(17, 17, 17, 0.4);
}
.header-row-style{
  background-color: red;
}
</style>
