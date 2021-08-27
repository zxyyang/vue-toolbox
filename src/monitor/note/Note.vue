<template>
  <div>
  <div  class="tablediv">
    <el-table
        class="table"
        :data="pageInfo.list"
        style="width: 100%">
      <el-table-column
          prop="noteName"
          label="笔记名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="noteContent1"
          label="内容"
          width="180">
      </el-table-column>
      <el-table-column
          prop="noteRemark"
          label="备注">
      </el-table-column>
      <el-table-column
          prop="noteType"
          label="类型">
      </el-table-column>
      <el-table-column
          prop="noteTime"
          label="时间">
      </el-table-column>
    </el-table>
  </div>
    <div>
      <!--    分页-->
      <el-col :span="24" class="toolbar" style="position:absolute;bottom:10px;right:0">
        <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="float: right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </el-col>
    </div>
</div>
  </template>


<script>
import {list} from "@/api/note";

export default {

  name: "Note",
  data(){
    return{
      pageInfo:{
      },
      total:0,
      pageNumber:1,
      pageSize: 10,
      currentPage:1,


    }


    },
  created() {

  },
  mounted() {
    this.getData();
  },
  destroyed() {
  },
  methods:{
    getData(){
   const param ={
     pageNumber: this.pageNumber,
     pageSize: this.pageSize
   }
      list(param).then(res=>{
        this.pageInfo = res.data
        this.total =res.data.total
      })
    },
    // 改变页码
    handleSizeChange(val) {
      this.pageSize = val
      this.getData();

    },
    // 分页触发
    handleCurrentChange(val) {
      this.pageNumber = val
      this.getData(val)
    },
  }

}

</script>

<style scoped>
.table{
  background-color: #212121 !important;
}

</style>
