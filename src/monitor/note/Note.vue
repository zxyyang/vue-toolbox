<template>
  <div>
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
        <el-table-column label="内容" align="center" type="expand">
          <template slot-scope="{ row }">
            <div
              id="content"
              style="
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
              /*height: 34px;*/
              text-align: center;
            "
              v-html="row.noteContent"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="noteName"
          label="笔记名称"
          width="180"
        />
        <el-table-column
          prop="noteContent1"
          label="内容"
          width="180"
        />
        <el-table-column
          prop="noteRemark"
          label="备注"
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
            <el-button type="text" size="small" @click="showDrawer(scope.row)">查看</el-button>
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
      visible: false,
      placement: 'top',
      pageInfo: {
      },
      total: 0,
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1

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

    showDrawer(ras) {
      this.visible = true
    },
    onClose() {
      this.visible = false
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

</style>
