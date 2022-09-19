<template>

  <div>
    <div style="margin-top: 10px;margin-bottom: 10px">
      <!--      <a-space style="margin-left: 2%">-->
      <!--        <a-input-search-->
      <!--          v-model="searchValue"-->
      <!--          placeholder="input search remind name"-->
      <!--          @search="onSearch"-->
      <!--        />-->
      <!--      </a-space>-->
      <a-button type="primary" style="float: right; margin-right: 2%" @click="$router.push('/wx/addRemind')">新建备忘录</a-button>
    </div>
    <div class="tablediv">

      <el-table
        ref="multipleTable"
        tooltip-effect="dark"

        class="table"
        :data="pageInfo.list"
        style="width: 100%; "
        :default-sort="{prop: 'date', order: 'descending'}"
        row-key="id"
        @selection-change="checkedChange"
      >
        <el-table-column
          type="selection"
          align="center"
        />
        <el-table-column
          prop="id"
          label="任务编号"
          align="center"
        />
        <el-table-column
          sortable
          prop="time"
          label="时间"
          align="center"
        />
        <el-table-column
          prop="content"
          label="提醒内容"
          align="center"
        />
        <el-table-column
          prop="type"
          label="提醒人"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        />
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <a-button type="danger" size="small" ghost @click="deleteRemind(scope.row)">删除</a-button>
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
    </div>

  </div>

</template>

<script>

import { listRemind, deleteRemind } from '@/api/remind'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
export default {

  name: 'Wx',
  data() {
    return {
      sels: [], // 列表选中的选项
      searchValue: '',
      loading: false,
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
    this.getData()
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
    // 删除
    deleteRemind(row) {
      console.log(row)
      this.setVisible = true
      // eslint-disable-next-line no-unused-vars
      let ids = this.sels.map(item => item.id).join(',')
      if (this.sels.length === 0) {
        ids = row.id
      }
      this.$confirm('确认删除选中记录？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteRemind({ ids: ids }).then(res => {
          // eslint-disable-next-line no-cond-assign,no-constant-condition
          if (res.code === 200) {
            this.$message.success(res.msg)
          } else {
            this.$message.error(res.msg)
          }
          this.getData()
        })
      }).catch(() => {})
    },
    // 显示备忘录内容
    getData() {
      const param = {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }

      listRemind(param).then(res => {
        if (res.code === 200) {
          const datas = res.data.list
          for (let i = 0; i < datas.length; i++) {
            var type
            switch (datas[i].type) {
              case 0 : {
                type = '所有人'
                break
              }
              case 1 : {
                type = '杨梓轩'
                break
              }
              case 2 : {
                type = '周艺'
                break
              }
              default: {
                type = '所有人'
                break
              }
            }
            datas[i].type = type
          }
          res.data.list = datas
          this.pageInfo = res.data
          this.total = res.data.total
        } else {
          this.$message.error('错误！')
        }
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
    },
    // 多选
    checkedChange(sels) {
      this.sels = sels
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
